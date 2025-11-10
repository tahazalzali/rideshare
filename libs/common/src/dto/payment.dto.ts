import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString } from 'class-validator';

export class PaymentAuthorizeDto {
  @ApiProperty() @IsUUID() tripId!: string;
  @ApiProperty() @IsUUID() passengerId!: string;
  @ApiProperty() @IsNumber() amount!: number;
}

export class PaymentActionDto {
  @ApiProperty() @IsString() authorizationId!: string;
}
