import { PricingService } from '../domain/pricing.service';
export declare class PricingHttpController {
    private pricing;
    constructor(pricing: PricingService);
    estimate(q: any): {
        currency: string;
        amount: number;
    };
}
