import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PricingController } from './transport/pricing.message.controller';
import { PricingHttpController } from './transport/pricing.http.controller';
import { PricingService } from './domain/pricing.service';
import { RmqModule } from '@rides/common'; // <-- add

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RmqModule,
  ],
  controllers: [PricingController, PricingHttpController],
  providers: [PricingService],
})
export class AppModule {}
