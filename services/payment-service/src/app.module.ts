import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAuth } from './domain/payment-auth.entity';
import { PaymentService } from './domain/payment.service';
import { PaymentMessageController } from './transport/payment.message.controller';
import { RmqModule } from '@rides/common';

import { PaymentHttpController } from './transport/payment.http.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 5436),
        username: process.env.DB_USER || 'payment',
        password: process.env.DB_PASS || 'payment',
        database: process.env.DB_NAME || 'payment',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([PaymentAuth]),
    RmqModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentMessageController , PaymentHttpController],
})
export class AppModule {}