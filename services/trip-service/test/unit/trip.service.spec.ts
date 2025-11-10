import { Test } from '@nestjs/testing';
import { TripService } from '../../src/domain/trip.service';
import { TripRepository } from '../../src/infra/trip.repository';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('TripService (unit)', () => {
  it('books a trip happy path', async () => {
    const repo = {
      save: jest.fn()
        .mockResolvedValueOnce({ id: 't1', status: 'REQUESTED' })
        .mockResolvedValueOnce({ id: 't1', status: 'PRICED', price: 10, currency: 'USD' })
        .mockResolvedValueOnce({ id: 't1', status: 'AUTHORIZED', paymentAuthId: 'auth1', price: 10, currency: 'USD' })
        .mockResolvedValueOnce({ id: 't1', status: 'DRIVER_ASSIGNED', driverId: 'd1', price: 10, currency: 'USD' }),
    } as unknown as TripRepository;
    const pricing = { send: () => of({ currency: 'USD', amount: 10 }) } as unknown as ClientProxy;
    const payment = { send: () => of({ authorizationId: 'auth1', status: 'authorized' }) } as unknown as ClientProxy;
    const driver = { send: () => of({ driverId: 'd1' }) } as unknown as ClientProxy;
    const module = await Test.createTestingModule({
      providers: [
        TripService,
        { provide: TripRepository, useValue: repo },
        { provide: 'PRICING', useValue: pricing },
        { provide: 'PAYMENT', useValue: payment },
        { provide: 'DRIVER', useValue: driver },
      ],
    }).compile();
    const svc = module.get(TripService);
    const trip = await svc.book({ passengerId: 'p1', pickupLat: 1, pickupLng: 1, dropoffLat: 2, dropoffLng: 2 });
    expect(trip.status).toBe('DRIVER_ASSIGNED');
  });
});
