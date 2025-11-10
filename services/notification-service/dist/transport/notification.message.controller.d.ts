import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@rides/common';
export declare class NotificationMessageController {
    private rmq;
    private readonly logger;
    constructor(rmq: RmqService);
    send(payload: any, ctx: RmqContext): Promise<{
        ok: boolean;
    }>;
}
