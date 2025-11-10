import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@rides/common';
import { Passenger } from './domain/passenger.entity';
import { PassengerService } from './domain/passenger.service';
import { PassengerMessageController } from './transport/passenger.message.controller';

import { PassengerHttpController } from './transport/passenger.http.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RmqModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'passenger',
        password: process.env.DB_PASS || 'passenger',
        database: process.env.DB_NAME || 'passenger',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Passenger]),
  ],
  providers: [PassengerService],
  controllers: [PassengerMessageController , PassengerHttpController],
})
export class AppModule {}