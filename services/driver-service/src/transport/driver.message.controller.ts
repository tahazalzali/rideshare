import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { PATTERNS, RmqService } from '@rides/common';
import { DriverService } from '../domain/driver.service';

@Controller()
export class DriverMessageController {
  constructor(private drivers: DriverService, private rmq: RmqService) {}

  @MessagePattern(PATTERNS.DRIVER.FIND_AVAILABLE)
  async findAvailable(@Payload() payload: { lat: number; lng: number }, @Ctx() ctx: RmqContext) {
    const d = await this.drivers.findAvailableNear(payload.lat, payload.lng);
    this.rmq.ack(ctx);
    return d ? { driverId: d.id } : null;
  }

  @MessagePattern(PATTERNS.DRIVER.ASSIGN)
  async assign(@Payload() payload: { driverId: string }, @Ctx() ctx: RmqContext) {
    await this.drivers.assign(payload.driverId);
    this.rmq.ack(ctx);
    return { ok: true };
  }
}
