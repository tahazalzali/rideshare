import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PricingService } from '../domain/pricing.service';
import { EstimatePriceDto, PriceQuoteDto } from '@rides/common';

@ApiTags('internal')
@Controller('internal')
export class PricingHttpController {
  constructor(private pricing: PricingService) {}

  @Get(['estimate', 'pricing/estimate'])
  @ApiOperation({ summary: 'Estimate ride price based on pickup and dropoff coordinates' })
  @ApiQuery({ name: 'pickupLat', type: Number, description: 'Pickup latitude', example: 37.77 })
  @ApiQuery({ name: 'pickupLng', type: Number, description: 'Pickup longitude', example: -122.42 })
  @ApiQuery({ name: 'dropoffLat', type: Number, description: 'Dropoff latitude', example: 37.78 })
  @ApiQuery({ name: 'dropoffLng', type: Number, description: 'Dropoff longitude', example: -122.41 })
  @ApiQuery({
    name: 'serviceLevel',
    required: false,
    enum: ['standard', 'premium', 'xl'],
    description: 'Optional service level to price',
  })
  @ApiResponse({ status: 200, description: 'Price estimate calculated successfully', type: PriceQuoteDto })
  estimate(@Query() q: EstimatePriceDto) {
    return this.pricing.estimate(q);
  }

  @Get('pricing/config')
  @ApiOperation({ summary: 'Inspect the fare table used for quotes' })
  @ApiResponse({ status: 200, description: 'Current fare rules' })
  config() {
    return this.pricing.getConfig();
  }
}
