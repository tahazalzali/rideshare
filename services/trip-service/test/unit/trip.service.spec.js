"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const trip_service_1 = require("../../src/domain/trip.service");
const trip_repository_1 = require("../../src/infra/trip.repository");
const rxjs_1 = require("rxjs");
describe('TripService (unit)', () => {
    it('books a trip happy path', async () => {
        const repo = {
            save: jest.fn()
                .mockResolvedValueOnce({ id: 't1', status: 'REQUESTED' })
                .mockResolvedValueOnce({ id: 't1', status: 'PRICED', price: 10, currency: 'USD' })
                .mockResolvedValueOnce({ id: 't1', status: 'AUTHORIZED', paymentAuthId: 'auth1', price: 10, currency: 'USD' })
                .mockResolvedValueOnce({ id: 't1', status: 'DRIVER_ASSIGNED', driverId: 'd1', price: 10, currency: 'USD' }),
        };
        const pricing = { send: () => (0, rxjs_1.of)({ currency: 'USD', amount: 10 }) };
        const payment = { send: () => (0, rxjs_1.of)({ authorizationId: 'auth1', status: 'authorized' }) };
        const driver = { send: () => (0, rxjs_1.of)({ driverId: 'd1' }) };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                trip_service_1.TripService,
                { provide: trip_repository_1.TripRepository, useValue: repo },
                { provide: 'PRICING', useValue: pricing },
                { provide: 'PAYMENT', useValue: payment },
                { provide: 'DRIVER', useValue: driver },
            ],
        }).compile();
        const svc = module.get(trip_service_1.TripService);
        const trip = await svc.book({ passengerId: 'p1', pickupLat: 1, pickupLng: 1, dropoffLat: 2, dropoffLng: 2 });
        expect(trip.status).toBe('DRIVER_ASSIGNED');
    });
});
//# sourceMappingURL=trip.service.spec.js.map