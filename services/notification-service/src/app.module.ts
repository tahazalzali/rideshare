import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationMessageController } from './transport/notification.message.controller';
import { RmqModule } from '@rides/common';

import { NotificationHttpController } from './transport/notification.http.controller';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RmqModule],
  controllers: [NotificationMessageController , NotificationHttpController],
})
export class AppModule {}