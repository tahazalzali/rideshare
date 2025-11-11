import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiProperty, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PATTERNS, Roles } from '@rides/common';
import { RolesGuard } from '@rides/common';
import { firstValueFrom, timeout } from 'rxjs';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

class CreatePassengerDto {
  @ApiProperty({ example: 'Alice Example' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email!: string;
}

const PASSENGER_EXAMPLE = {
  id: 'a4c6f9d8-3bcb-4c6a-bc9a-6d590d123456',
  name: 'Alice Example',
  email: 'alice@example.com',
  createdAt: '2024-05-01T10:30:00.000Z',
};

const PASSENGER_LIST_EXAMPLE = [
  PASSENGER_EXAMPLE,
  {
    id: 'b6d8e2aa-9c4f-4fb3-8b3e-2c8bf9ea1111',
    name: 'Bob Rider',
    email: 'bob.rider@example.com',
    createdAt: '2024-05-02T11:15:00.000Z',
  },
];

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/passengers' })
export class PassengerController {
  constructor(@Inject('PASSENGER') private readonly passengers: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a passenger profile' })
  @ApiBody({ type: CreatePassengerDto, schema: { example: { name: 'Alice Example', email: 'alice@example.com' } } })
  @ApiResponse({ status: 201, description: 'Passenger created', schema: { example: PASSENGER_EXAMPLE } })
  @Roles('Admin')
  async create(@Body() dto: CreatePassengerDto) {
    const result$ = this.passengers.send(PATTERNS.PASSENGER.CREATE, dto).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Get()
  @ApiOperation({ summary: 'List passengers (admin only)' })
  @ApiResponse({ status: 200, description: 'Passenger list', schema: { example: PASSENGER_LIST_EXAMPLE } })
  @ApiQuery({ name: 'search', required: false, description: 'Filter by name/email', example: 'alice' })
  @Roles('Admin')
  async list(@Query('search') search?: string) {
    const payload = search?.trim() ? { search } : {};
    const result$ = this.passengers.send(PATTERNS.PASSENGER.LIST, payload).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch passenger by id' })
  @ApiResponse({ status: 200, description: 'Passenger found', schema: { example: PASSENGER_EXAMPLE } })
  @ApiResponse({ status: 404, description: 'Passenger not found' })
  @Roles('Passenger', 'Driver', 'Admin')
  async get(@Param('id') id: string) {
    const result$ = this.passengers.send(PATTERNS.PASSENGER.GET, id).pipe(timeout(5000));
    const passenger = await firstValueFrom(result$);
    if (!passenger) throw new NotFoundException(`Passenger ${id} not found`);
    return passenger;
  }
}
