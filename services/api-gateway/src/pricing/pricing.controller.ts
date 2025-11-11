import { Controller, Get, Query, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { EstimatePriceDto, PriceQuoteDto, PATTERNS, Roles } from '@rides/common';
import { lastValueFrom, timeout } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@rides/common';

const PRICE_QUOTE_EXAMPLE: PriceQuoteDto = {
  currency: 'USD',
  amount: 18.5,
  serviceLevel: 'standard',
  surgeMultiplier: 1.2,
  distanceKm: 4.3,
  durationMinutes: 12,
  breakdown: {
    base: 3,
    distanceComponent: 10.3,
    durationComponent: 5.2,
    minimumFare: 8,
  },
};

@ApiTags('pricing')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/pricing' })
export class PricingHttpController {
  constructor(@Inject('PRICING') private pricing: ClientProxy) {}

  @Get('estimate')
  @ApiOperation({ summary: 'Estimate ride price based on pickup and dropoff coordinates' })
  @ApiQuery({ name: 'pickupLat', type: Number, example: 37.7749 })
  @ApiQuery({ name: 'pickupLng', type: Number, example: -122.4194 })
  @ApiQuery({ name: 'dropoffLat', type: Number, example: 37.7841 })
  @ApiQuery({ name: 'dropoffLng', type: Number, example: -122.4094 })
  @ApiQuery({ name: 'serviceLevel', required: false, examples: { standard: { value: 'standard' } } })
  @ApiResponse({ status: 200, description: 'Price estimate', type: PriceQuoteDto, schema: { example: PRICE_QUOTE_EXAMPLE } })
  @Roles('Passenger', 'Driver', 'Admin')
  async estimate(@Query() dto: EstimatePriceDto): Promise<PriceQuoteDto> {
    return lastValueFrom(this.pricing.send(PATTERNS.PRICING.ESTIMATE, dto).pipe(timeout(5000)));
  }
}
