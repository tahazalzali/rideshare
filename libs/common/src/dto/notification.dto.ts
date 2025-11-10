import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NotificationDto {
  @ApiProperty() @IsString() to!: string;
  @ApiProperty() @IsString() message!: string;
}
