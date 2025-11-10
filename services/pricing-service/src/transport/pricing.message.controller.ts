import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { PATTERNS, RmqService, EstimatePriceDto } from '@rides/common';
import { PricingService } from '../domain/pricing.service';

@Controller()
export class PricingController {
  constructor(private pricing: PricingService, private rmq: RmqService) {}

  @MessagePattern(PATTERNS.PRICING.ESTIMATE)
  async estimate(@Payload() payload: EstimatePriceDto, @Ctx() ctx: RmqContext) {
    const quote = this.pricing.estimate(payload);
    this.rmq.ack(ctx);
    return quote;
  }
}
