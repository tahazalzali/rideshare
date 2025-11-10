import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Ctx, RmqContext, Payload } from '@nestjs/microservices';
import { RmqService, PATTERNS } from '@rides/common';

@Controller()
export class NotificationMessageController {
  private readonly logger = new Logger(NotificationMessageController.name);
  constructor(private rmq: RmqService) {}

  @MessagePattern(PATTERNS.NOTIFICATION.SEND)
  async send(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    this.logger.log(`Notify: ${JSON.stringify(payload)}`);
    this.rmq.ack(ctx);
    return { ok: true };
  }
}
