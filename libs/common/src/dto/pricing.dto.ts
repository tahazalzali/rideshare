import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsIn } from 'class-validator';

export class EstimatePriceDto {
  @ApiProperty({ example: 37.7749 })
  @IsNumber()
  pickupLat!: number;

  @ApiProperty({ example: -122.4194 })
  @IsNumber()
  pickupLng!: number;

  @ApiProperty({ example: 37.7841 })
  @IsNumber()
  dropoffLat!: number;

  @ApiProperty({ example: -122.4094 })
  @IsNumber()
  dropoffLng!: number;

  @ApiPropertyOptional({ enum: ['standard', 'premium', 'xl'], example: 'standard' })
  @IsOptional()
  @IsIn(['standard', 'premium', 'xl'])
  serviceLevel?: 'standard' | 'premium' | 'xl';
}
export class PriceBreakdownDto {
  @ApiProperty() base!: number;
  @ApiProperty() distanceComponent!: number;
  @ApiProperty() durationComponent!: number;
  @ApiProperty() minimumFare!: number;
}

export class PriceQuoteDto {
  @ApiProperty() currency!: string;
  @ApiProperty() amount!: number;
  @ApiPropertyOptional() serviceLevel?: 'standard' | 'premium' | 'xl';
  @ApiPropertyOptional() surgeMultiplier?: number;
  @ApiPropertyOptional() distanceKm?: number;
  @ApiPropertyOptional() durationMinutes?: number;
  @ApiPropertyOptional({
    description: 'Fare breakdown with the values that compose the quote',
    type: () => PriceBreakdownDto,
  })
  breakdown?: PriceBreakdownDto;
}
