import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

class LoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password!: string;
}

class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password!: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  roles!: string[];
}

@ApiTags('auth')
@Controller({ path: 'v1/auth' })
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.users.register(dto.email, dto.password, dto.roles);
  }
}
