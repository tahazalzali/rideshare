"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pricing_service_1 = require("../../src/domain/pricing.service");
describe('PricingService', () => {
    it('estimates price >= base', () => {
        const s = new pricing_service_1.PricingService();
        const q = s.estimate(37.7749, -122.4194, 37.7849, -122.4094);
        expect(q.amount).toBeGreaterThanOrEqual(5);
        expect(q.currency).toBe('USD');
    });
});
//# sourceMappingURL=pricing.service.spec.js.map