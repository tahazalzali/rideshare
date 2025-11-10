import { ClientProxy } from '@nestjs/microservices';
import { EstimatePriceDto, PriceQuoteDto } from '@rides/common';
export declare class PricingHttpController {
    private pricing;
    constructor(pricing: ClientProxy);
    estimate(dto: EstimatePriceDto): Promise<PriceQuoteDto>;
}
