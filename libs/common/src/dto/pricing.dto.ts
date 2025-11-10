import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsIn } from 'class-validator';

export class EstimatePriceDto {
  @ApiProperty() @IsNumber() pickupLat!: number;
  @ApiProperty() @IsNumber() pickupLng!: number;
  @ApiProperty() @IsNumber() dropoffLat!: number;
  @ApiProperty() @IsNumber() dropoffLng!: number;
  @ApiPropertyOptional({ enum: ['standard', 'premium', 'xl'] })
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

