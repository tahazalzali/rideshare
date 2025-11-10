import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { PATTERNS } from '@rides/common';
import { TripRepository } from '../infra/trip.repository';
import { Trip } from './trip.entity';

@Injectable()
export class TripService {
  private readonly logger = new Logger(TripService.name);
  constructor(
    private repo: TripRepository,
    @Inject('PRICING') private pricing: ClientProxy,
    @Inject('PAYMENT') private payment: ClientProxy,
    @Inject('DRIVER') private driver: ClientProxy,
  ) {}

  // Saga orchestrator for trip booking
  async book(payload: {
    passengerId: string;
    pickupLat: number; pickupLng: number;
    dropoffLat: number; dropoffLng: number;
  }): Promise<Trip> {
    // 1) Create trip in REQUESTED
    let trip = await this.repo.save({
      passengerId: payload.passengerId,
      pickupLat: payload.pickupLat, pickupLng: payload.pickupLng,
      dropoffLat: payload.dropoffLat, dropoffLng: payload.dropoffLng,
      status: 'REQUESTED', currency: 'USD', price: 0,
    });

    // 2) Price (RPC)
    const quote = await firstValueFrom(
      this.pricing.send(PATTERNS.PRICING.ESTIMATE, payload).pipe(timeout(5000)),
    );
    trip.price = quote.amount;
    trip.currency = quote.currency;
    trip.status = 'PRICED';
    trip = await this.repo.save(trip);

    // 3) Authorize payment (RPC)
    const auth = await firstValueFrom(
      this.payment
        .send(PATTERNS.PAYMENT.AUTHORIZE, {
          tripId: trip.id,
          passengerId: payload.passengerId,
          amount: trip.price,
        })
        .pipe(timeout(5000)),
    );
    trip.paymentAuthId = auth.authorizationId;
    trip.status = 'AUTHORIZED';
    trip = await this.repo.save(trip);

    // 4) Find and assign driver (RPC + async compensation on failure)
    const driver = await firstValueFrom(
      this.driver
        .send(PATTERNS.DRIVER.FIND_AVAILABLE, {
          lat: payload.pickupLat,
          lng: payload.pickupLng,
        })
        .pipe(timeout(5000)),
    );
    if (!driver) {
      // Compensate -> release payment
      await firstValueFrom(
        this.payment
          .send(PATTERNS.PAYMENT.RELEASE, { authorizationId: trip.paymentAuthId })
          .pipe(timeout(5000)),
      );
      trip.status = 'CANCELLED';
      return this.repo.save(trip);
    }
    await firstValueFrom(
      this.driver.send(PATTERNS.DRIVER.ASSIGN, { driverId: driver.driverId }).pipe(timeout(5000)),
    );
    trip.driverId = driver.driverId;
    trip.status = 'DRIVER_ASSIGNED';
    return this.repo.save(trip);
  }

  async get(id: string) {
    return this.repo.findById(id);
  }

  async start(id: string): Promise<Trip> {
    const trip = await this.repo.findById(id);
    if (!trip) throw new Error('Trip not found');
    if (trip.status !== 'DRIVER_ASSIGNED') {
      throw new Error('Trip cannot be started in current status');
    }
    trip.status = 'IN_PROGRESS';
    return this.repo.save(trip);
  }

  async complete(id: string): Promise<Trip> {
    const trip = await this.repo.findById(id);
    if (!trip) throw new Error('Trip not found');
    if (trip.status !== 'IN_PROGRESS') {
      throw new Error('Trip cannot be completed in current status');
    }
    
    // Capture payment
    await firstValueFrom(
      this.payment
        .send(PATTERNS.PAYMENT.CAPTURE, { authorizationId: trip.paymentAuthId })
        .pipe(timeout(5000)),
    );
    
    trip.status = 'COMPLETED';
    return this.repo.save(trip);
  }

  async cancel(id: string, reason?: string): Promise<Trip> {
    const trip = await this.repo.findById(id);
    if (!trip) throw new Error('Trip not found');
    
    if (['COMPLETED', 'CANCELLED'].includes(trip.status)) {
      throw new Error('Cannot cancel completed or already cancelled trip');
    }

    // Release payment if authorized
    if (trip.paymentAuthId && ['AUTHORIZED', 'DRIVER_ASSIGNED', 'IN_PROGRESS'].includes(trip.status)) {
      await firstValueFrom(
        this.payment
          .send(PATTERNS.PAYMENT.RELEASE, { authorizationId: trip.paymentAuthId })
          .pipe(timeout(5000)),
      );
    }

    trip.status = 'CANCELLED';
    trip.cancellationReason = reason;
    return this.repo.save(trip);
  }

  async getPassengerTrips(passengerId: string): Promise<Trip[]> {
    return this.repo.findByPassengerId(passengerId);
  }

  async getDriverTrips(driverId: string): Promise<Trip[]> {
    return this.repo.findByDriverId(driverId);
  }
}
