import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqService } from './rmq.service';

@Global()
@Module({ providers: [RmqService], exports: [RmqService] })
export class RmqModule {
  static register(queues: { name: string; queue: string }[]): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.register(
          queues.map((q) => ({
            name: q.name,
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URI || 'amqp://rabbitmq:rabbitmq@localhost:5672'],
              queue: q.queue,
              queueOptions: { durable: true },
            },
          })),
        ),
      ],
      exports: [ClientsModule, RmqService],
    };
  }
}
