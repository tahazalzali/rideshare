import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { PATTERNS, RmqService } from '@rides/common';
import { PassengerService } from '../domain/passenger.service';

@Controller()
export class PassengerMessageController {
  constructor(private passengers: PassengerService, private rmq: RmqService) {}

  @MessagePattern(PATTERNS.PASSENGER.CREATE)
  async create(@Payload() payload: { name: string; email: string }, @Ctx() ctx: RmqContext) {
    const res = await this.passengers.create(payload);
    this.rmq.ack(ctx);
    return res;
  }

  @MessagePattern(PATTERNS.PASSENGER.GET)
  async get(@Payload() id: string, @Ctx() ctx: RmqContext) {
    const res = await this.passengers.findById(id);
    this.rmq.ack(ctx);
    return res;
  }

  @MessagePattern(PATTERNS.PASSENGER.LIST)
  async list(@Payload() payload: { search?: string } | undefined, @Ctx() ctx: RmqContext) {
    const res = await this.passengers.list(payload?.search);
    this.rmq.ack(ctx);
    return res;
  }
}
