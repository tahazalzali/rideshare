import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

class LoginDto {
  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'supersafe' })
  @IsString()
  @MinLength(4)
  password!: string;
}

class RegisterDto {
  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'supersafe' })
  @IsString()
  @MinLength(4)
  password!: string;

  @ApiProperty({ isArray: true, type: String, example: ['Passenger'] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  roles!: string[];
}

const AUTH_TOKEN_EXAMPLE = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.payload.signature',
};

const AUTH_USER_EXAMPLE = {
  id: 1,
  email: 'alice@example.com',
  roles: ['Passenger',"Admin"],
  passwordHash: 'c30c030bd3667bfe9eda3107738b9458e202c05ddc911915d7eb5bc1274140d5',
};

@ApiTags('auth')
@Controller({ path: 'v1/auth' })
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate and receive a JWT' })
  @ApiBody({ type: LoginDto, schema: { example: { email: 'alice@example.com', password: 'supersafe' } } })
  @ApiResponse({ status: 200, description: 'JWT returned', schema: { example: AUTH_TOKEN_EXAMPLE } })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create a demo user (in-memory)' })
  @ApiBody({
    type: RegisterDto,
    schema: { example: { email: 'alice@example.com', password: 'supersafe', roles: ['Passenger','Admin'] } },
  })
  @ApiResponse({ status: 201, description: 'User created', schema: { example: AUTH_USER_EXAMPLE } })
  register(@Body() dto: RegisterDto) {
    return this.users.register(dto.email, dto.password, dto.roles);
  }
}
