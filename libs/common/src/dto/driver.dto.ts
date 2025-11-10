import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FindDriverDto {
  @ApiProperty() @IsNumber() lat!: number;
  @ApiProperty() @IsNumber() lng!: number;
}

export class AssignDriverDto {
  @ApiProperty() @IsString() driverId!: string;
}
