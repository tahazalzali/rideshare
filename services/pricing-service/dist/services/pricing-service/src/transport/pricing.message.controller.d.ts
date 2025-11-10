import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@rides/common';
import { PricingService } from '../domain/pricing.service';
export declare class PricingController {
    private pricing;
    private rmq;
    constructor(pricing: PricingService, rmq: RmqService);
    estimate(payload: {
        pickupLat: number;
        pickupLng: number;
        dropoffLat: number;
        dropoffLng: number;
    }, ctx: RmqContext): Promise<{
        currency: string;
        amount: number;
    }>;
}
