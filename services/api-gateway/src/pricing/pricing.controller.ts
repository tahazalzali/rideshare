import { Controller, Get, Query, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { EstimatePriceDto, PriceQuoteDto, PATTERNS, Roles } from '@rides/common';
import { lastValueFrom, timeout } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@rides/common';

@ApiTags('pricing')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/pricing' })
export class PricingHttpController {
  constructor(@Inject('PRICING') private pricing: ClientProxy) {}

  @Get('estimate')
  @ApiOperation({ summary: 'Estimate ride price based on pickup and dropoff coordinates' })
  @ApiResponse({ status: 200, description: 'Price estimate', type: PriceQuoteDto })
  @Roles('Passenger', 'Driver', 'Admin')
  async estimate(@Query() dto: EstimatePriceDto): Promise<PriceQuoteDto> {
    return lastValueFrom(this.pricing.send(PATTERNS.PRICING.ESTIMATE, dto).pipe(timeout(5000)));
  }
}
