import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { PATTERNS, RmqService } from '@rides/common';
import { TripService } from '../domain/trip.service';

@Controller()
export class TripMessageController {
  constructor(private trips: TripService, private rmq: RmqService) {}

  @MessagePattern(PATTERNS.TRIP.BOOK)
  async book(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    const trip = await this.trips.book(payload);
    this.rmq.ack(ctx);
    return {
      id: trip.id,
      status: trip.status,
      price: trip.price,
      currency: trip.currency,
      driverId: trip.driverId,
      paymentAuthId: trip.paymentAuthId,
    };
  }

  @MessagePattern(PATTERNS.TRIP.GET)
  async get(@Payload() id: string, @Ctx() ctx: RmqContext) {
    const trip = await this.trips.get(id);
    this.rmq.ack(ctx);
    if (!trip) return null;
    return {
      id: trip.id,
      status: trip.status,
      price: trip.price,
      currency: trip.currency,
      driverId: trip.driverId,
      passengerId: trip.passengerId,
      paymentAuthId: trip.paymentAuthId,
      pickupLat: trip.pickupLat,
      pickupLng: trip.pickupLng,
      dropoffLat: trip.dropoffLat,
      dropoffLng: trip.dropoffLng,
    };
  }

  @MessagePattern(PATTERNS.TRIP.START)
  async start(@Payload() id: string, @Ctx() ctx: RmqContext) {
    const trip = await this.trips.start(id);
    this.rmq.ack(ctx);
    return { id: trip.id, status: trip.status };
  }

  @MessagePattern(PATTERNS.TRIP.COMPLETE)
  async complete(@Payload() id: string, @Ctx() ctx: RmqContext) {
    const trip = await this.trips.complete(id);
    this.rmq.ack(ctx);
    return { id: trip.id, status: trip.status };
  }

  @MessagePattern(PATTERNS.TRIP.CANCEL)
  async cancel(@Payload() payload: { id: string; reason?: string }, @Ctx() ctx: RmqContext) {
    const trip = await this.trips.cancel(payload.id, payload.reason);
    this.rmq.ack(ctx);
    return { id: trip.id, status: trip.status };
  }
}
