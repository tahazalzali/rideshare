"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const driver_service_1 = require("../../src/domain/driver.service");
const typeorm_1 = require("@nestjs/typeorm");
const driver_entity_1 = require("../../src/domain/driver.entity");
describe('DriverService (unit)', () => {
    it('marks a driver assigned', async () => {
        const repo = { update: jest.fn(), findOne: jest.fn() };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                driver_service_1.DriverService,
                { provide: (0, typeorm_1.getRepositoryToken)(driver_entity_1.Driver), useValue: repo },
            ],
        }).compile();
        const svc = module.get(driver_service_1.DriverService);
        await svc.assign('d1');
        expect(repo.update).toHaveBeenCalledWith({ id: 'd1' }, { available: false });
    });
});
//# sourceMappingURL=driver.service.spec.js.map