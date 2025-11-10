import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from '../domain/payment.service';
import { PaymentAuthorizeDto, PaymentActionDto } from '@rides/common';

@ApiTags('internal')
@Controller('internal/payments')
export class PaymentHttpController {
  constructor(private payments: PaymentService) {}

  @Post('authorize')
  @ApiOperation({ summary: 'Authorize a payment for a trip' })
  authorize(@Body() body: PaymentAuthorizeDto) {
    return this.payments.authorize(body.tripId, body.passengerId, Number(body.amount));
  }

  @Post('capture')
  @ApiOperation({ summary: 'Capture a payment authorization' })
  capture(@Body() body: PaymentActionDto) {
    return this.payments.capture(body.authorizationId);
  }

  @Post('release')
  @ApiOperation({ summary: 'Release a payment authorization' })
  release(@Body() body: PaymentActionDto) {
    return this.payments.release(body.authorizationId);
  }
}
