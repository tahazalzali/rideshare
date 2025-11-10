import { EstimatePriceDto, PriceQuoteDto } from '@rides/common';
import { HttpCircuitService } from '../common/http-circuit.service';
export declare class PricingController {
    private http;
    constructor(http: HttpCircuitService);
    estimate(q: EstimatePriceDto): Promise<PriceQuoteDto>;
}
