"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const passenger_service_1 = require("../../src/domain/passenger.service");
const typeorm_1 = require("@nestjs/typeorm");
const passenger_entity_1 = require("../../src/domain/passenger.entity");
describe('PassengerService', () => {
    it('creates a passenger', async () => {
        const repo = {
            create: jest.fn().mockImplementation((x) => x),
            save: jest.fn().mockImplementation(async (x) => ({ ...x, id: 'uuid' })),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                passenger_service_1.PassengerService,
                { provide: (0, typeorm_1.getRepositoryToken)(passenger_entity_1.Passenger), useValue: repo }
            ]
        }).compile();
        const service = module.get(passenger_service_1.PassengerService);
        const out = await service.create({ name: 'A', email: 'a@x.com' });
        expect(out.id).toBeDefined();
    });
});
//# sourceMappingURL=passenger.service.spec.js.map