import { PricingService } from '../domain/pricing.service';
import { EstimatePriceDto } from '@rides/common';
export declare class PricingHttpController {
    private pricing;
    constructor(pricing: PricingService);
    estimate(q: EstimatePriceDto): {
        currency: string;
        amount: number;
    };
}
