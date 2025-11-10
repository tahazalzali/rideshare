import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { initTracing } from '@rides/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { metricsMiddleware, metricsHandler, correlationIdMiddleware } from '@rides/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await initTracing('pricing-service');
  const app = await NestFactory.create(AppModule, { 
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: false,
    }
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, 
      },
    }),
  );

  const doc = new DocumentBuilder().setTitle('Pricing Service').setVersion('1.0').build();
  const docObj = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('/docs', app, docObj);
  
  app.getHttpAdapter().getInstance().get('/metrics', metricsHandler);

  app.getHttpAdapter().getInstance().get('/health', (req: any, res: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.json({ status: 'ok', service: 'pricing-service' });
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI || 'amqp://rabbitmq:rabbitmq@localhost:5672'],
      queue: process.env.QUEUE_PRICING || 'pricing_queue',
      queueOptions: { durable: true },
      noAck: false,
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3011);
}
bootstrap();
