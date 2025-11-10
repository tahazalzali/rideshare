import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class BookTripDto {
  @ApiProperty() @IsUUID() passengerId!: string;
  @ApiProperty() @IsNumber() pickupLat!: number;
  @ApiProperty() @IsNumber() pickupLng!: number;
  @ApiProperty() @IsNumber() dropoffLat!: number;
  @ApiProperty() @IsNumber() dropoffLng!: number;
}

export class TripStatusDto {
  @ApiProperty() id!: string;
  @ApiProperty() status!: string;
  @ApiProperty() price!: number;
  @ApiProperty() driverId?: string;
  @ApiProperty() paymentAuthId?: string;
  @ApiProperty() currency!: string;
}
