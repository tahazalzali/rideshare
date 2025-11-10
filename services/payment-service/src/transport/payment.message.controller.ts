import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { PATTERNS, RmqService } from '@rides/common';
import { PaymentService } from '../domain/payment.service';

@Controller()
export class PaymentMessageController {
  constructor(private payments: PaymentService, private rmq: RmqService) {}

  @MessagePattern(PATTERNS.PAYMENT.AUTHORIZE)
  async authorize(@Payload() payload: { tripId: string; passengerId: string; amount: number }, @Ctx() ctx: RmqContext) {
    const auth = await this.payments.authorize(payload.tripId, payload.passengerId, payload.amount);
    this.rmq.ack(ctx);
    return { authorizationId: auth.id, status: auth.status };
  }

  @MessagePattern(PATTERNS.PAYMENT.CAPTURE)
  async capture(@Payload() payload: { authorizationId: string }, @Ctx() ctx: RmqContext) {
    const res = await this.payments.capture(payload.authorizationId);
    this.rmq.ack(ctx);
    return res;
  }

  @MessagePattern(PATTERNS.PAYMENT.RELEASE)
  async release(@Payload() payload: { authorizationId: string }, @Ctx() ctx: RmqContext) {
    const res = await this.payments.release(payload.authorizationId);
    this.rmq.ack(ctx);
    return res;
  }
}
