import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RmqModule } from '@rides/common';
import { TripController } from './trip/trip.controller';
import { PricingHttpController } from './pricing/pricing.controller';
import { PassengerController } from './passenger/passenger.controller';
import { NotificationController } from './notification/notification.controller';
import { DriverController } from './driver/driver.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    RmqModule.register([
      { name: 'TRIP', queue: process.env.QUEUE_TRIP || 'trip_queue' },
      { name: 'PRICING', queue: process.env.QUEUE_PRICING || 'pricing_queue' },
      { name: 'PASSENGER', queue: process.env.QUEUE_PASSENGER || 'passenger_queue' },
      { name: 'NOTIFICATION', queue: process.env.QUEUE_NOTIFICATION || 'notification_queue' },
      { name: 'DRIVER', queue: process.env.QUEUE_DRIVER || 'driver_queue' },
    ]),
    AuthModule,
  ],
  controllers: [TripController, PricingHttpController, PassengerController, NotificationController, DriverController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
