import { DynamicModule } from '@nestjs/common';
export declare class RmqModule {
    static register(queues: {
        name: string;
        queue: string;
    }[]): DynamicModule;
}
