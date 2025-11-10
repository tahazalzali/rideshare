import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './domain/trip.entity';
import { TripRepository } from './infra/trip.repository';
import { TripService } from './domain/trip.service';
import { TripMessageController } from './transport/trip.message.controller';
import { RmqModule } from '@rides/common';

import { TripHttpController } from './transport/trip.http.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'trip',
        password: process.env.DB_PASS || 'trip',
        database: process.env.DB_NAME || 'trip',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Trip]),
    RmqModule.register([
      { name: 'PRICING', queue: process.env.QUEUE_PRICING || 'pricing_queue' },
      { name: 'PAYMENT', queue: process.env.QUEUE_PAYMENT || 'payment_queue' },
      { name: 'DRIVER', queue: process.env.QUEUE_DRIVER || 'driver_queue' },
    ]),
  ],
  providers: [TripRepository, TripService],
  controllers: [TripMessageController , TripHttpController],
})
export class AppModule {}