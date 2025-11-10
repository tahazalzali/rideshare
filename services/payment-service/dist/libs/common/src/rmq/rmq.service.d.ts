import { RmqContext } from '@nestjs/microservices';
export declare class RmqService {
    private readonly logger;
    ack(context: RmqContext): void;
}
