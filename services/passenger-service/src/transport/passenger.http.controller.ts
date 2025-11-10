import { Controller, Post, Body, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiProperty } from '@nestjs/swagger';
import { PassengerService } from '../domain/passenger.service';

class CreatePassengerRequest {
  @ApiProperty({ example: 'Alice Example' })
  name!: string;

  @ApiProperty({ example: 'alice@example.com' })
  email!: string;
}

@ApiTags('internal')
@Controller('internal/passengers')
export class PassengerHttpController {
  constructor(private passengers: PassengerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a passenger' })
  @ApiResponse({ status: 201, description: 'Passenger created' })
  create(@Body() body: CreatePassengerRequest) {
    return this.passengers.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List passengers (simple search)' })
  @ApiResponse({ status: 200, description: 'List of passengers' })
  @ApiQuery({ name: 'search', required: false, description: 'Filter by name or email (ILIKE)' })
  list(@Query('search') search?: string) {
    return this.passengers.list(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get passenger by id' })
  @ApiResponse({ status: 200, description: 'Passenger found' })
  @ApiResponse({ status: 404, description: 'Passenger not found' })
  async get(@Param('id') id: string) {
    const passenger = await this.passengers.findById(id);
    if (!passenger) {
      throw new NotFoundException(`Passenger ${id} not found`);
    }
    return passenger;
  }
}
