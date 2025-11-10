import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiProperty } from '@nestjs/swagger';
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

@ApiTags('passengers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/passengers' })
export class PassengerController {
  constructor(@Inject('PASSENGER') private readonly passengers: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a passenger profile' })
  @ApiResponse({ status: 201, description: 'Passenger created' })
  @Roles('Admin')
  async create(@Body() dto: CreatePassengerDto) {
    const result$ = this.passengers.send(PATTERNS.PASSENGER.CREATE, dto).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Get()
  @ApiOperation({ summary: 'List passengers (admin only)' })
  @ApiResponse({ status: 200, description: 'Passenger list' })
  @ApiQuery({ name: 'search', required: false, description: 'Filter by name/email' })
  @Roles('Admin')
  async list(@Query('search') search?: string) {
    const payload = search?.trim() ? { search } : {};
    const result$ = this.passengers.send(PATTERNS.PASSENGER.LIST, payload).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch passenger by id' })
  @ApiResponse({ status: 200, description: 'Passenger found' })
  @ApiResponse({ status: 404, description: 'Passenger not found' })
  @Roles('Passenger', 'Driver', 'Admin')
  async get(@Param('id') id: string) {
    const result$ = this.passengers.send(PATTERNS.PASSENGER.GET, id).pipe(timeout(5000));
    const passenger = await firstValueFrom(result$);
    if (!passenger) throw new NotFoundException(`Passenger ${id} not found`);
    return passenger;
  }
}
