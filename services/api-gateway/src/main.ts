import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { LoggingInterceptor, metricsHandler, metricsMiddleware, correlationIdMiddleware } from '@rides/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { initTracing } from '@rides/common';

async function bootstrap() {
  await initTracing('api-gateway');
  const app = await NestFactory.create(AppModule, { 
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: false,
    }
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
  }));
  app.use(correlationIdMiddleware);
  app.use(metricsMiddleware);
  app.getHttpAdapter().getInstance().get('/metrics', metricsHandler);
  app.getHttpAdapter().getInstance().get('/health', (req: any, res: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.json({ status: 'ok', service: 'api-gateway' });
  });
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Ride Sharing API Gateway')
    .setDescription('Gateway for ride-sharing microservices')
    .setVersion('1.0')
    .addTag('notifications', 'Admin-only endpoints for triggering notification fan-out')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };
  SwaggerModule.setup('/docs', app, document, swaggerOptions);

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
