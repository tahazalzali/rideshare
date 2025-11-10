import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { initTracing } from '@rides/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { metricsMiddleware, metricsHandler, correlationIdMiddleware } from '@rides/common';

async function bootstrap() {
  await initTracing('trip-service');
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
    allowedHeaders: '*',
  });

  const doc = new DocumentBuilder().setTitle('Trip Service').setVersion('1.0').build();
  const docObj = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('/docs', app, docObj);
  
  app.getHttpAdapter().getInstance().get('/metrics', metricsHandler);

  app.getHttpAdapter().getInstance().get('/health', (req: any, res: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    res.json({ status: 'ok', service: 'trip-service' });
  });

  const rmqUrl = process.env.RABBITMQ_URI || 'amqp://rabbitmq:rabbitmq@localhost:5672';
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: process.env.QUEUE_TRIP || 'trip_queue',
      queueOptions: { durable: true },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3001);
}
bootstrap();
