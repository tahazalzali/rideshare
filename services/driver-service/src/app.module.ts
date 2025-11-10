import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './domain/driver.entity';
import { DriverService } from './domain/driver.service';
import { DriverMessageController } from './transport/driver.message.controller';
import { RmqModule } from '@rides/common';

import { DriverHttpController } from './transport/driver.http.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'driver',
        password: process.env.DB_PASS || 'driver',
        database: process.env.DB_NAME || 'driver',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Driver]),
    RmqModule,
  ],
  providers: [DriverService],
  controllers: [DriverMessageController , DriverHttpController],
})
export class AppModule {}