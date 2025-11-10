import { Injectable, Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  private readonly logger = new Logger(RmqService.name);

  ack(context: RmqContext) {
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    } catch (e) {
      this.logger.error('Failed to ack message', e as any);
    }
  }
}
