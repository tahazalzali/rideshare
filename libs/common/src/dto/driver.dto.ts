import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FindDriverDto {
  @ApiProperty() @IsNumber() lat!: number;
  @ApiProperty() @IsNumber() lng!: number;
}

export class AssignDriverDto {
  @ApiProperty() @IsString() driverId!: string;
}

export class CreateDriverDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 37.7749 })
  @IsNumber()
  lat!: number;

  @ApiProperty({ example: -122.4194 })
  @IsNumber()
  lng!: number;
}
