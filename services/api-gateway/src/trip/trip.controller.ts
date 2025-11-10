import { Body, Controller, Get, Inject, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PATTERNS, TripStatusDto, BookTripDto } from '@rides/common';
import { firstValueFrom, timeout } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@rides/common';
import { RolesGuard } from '@rides/common';

@ApiTags('trips')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/trips' })
export class TripController {
  constructor(@Inject('TRIP') private readonly tripClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Book a new trip' })
  @ApiResponse({ status: 201, description: 'Trip request accepted' })
  @Roles('Passenger')
  async book(@Body() dto: BookTripDto): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, BookTripDto>(PATTERNS.TRIP.BOOK, dto).pipe(timeout(8000));
    return firstValueFrom(result$);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip status by id' })
  @ApiResponse({ status: 200, description: 'Trip found' })
  @Roles('Passenger', 'Driver', 'Admin')
  async get(@Param('id') id: string): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, string>(PATTERNS.TRIP.GET, id).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Start a trip (Driver only)' })
  @ApiResponse({ status: 200, description: 'Trip started' })
  @Roles('Driver')
  async start(@Param('id') id: string): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, string>(PATTERNS.TRIP.START, id).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a trip (Driver only)' })
  @ApiResponse({ status: 200, description: 'Trip completed' })
  @Roles('Driver')
  async complete(@Param('id') id: string): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, string>(PATTERNS.TRIP.COMPLETE, id).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a trip' })
  @ApiResponse({ status: 200, description: 'Trip cancelled' })
  @Roles('Passenger', 'Driver', 'Admin')
  async cancel(@Param('id') id: string, @Body() body: { reason?: string }): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto>(PATTERNS.TRIP.CANCEL, { id, reason: body.reason }).pipe(timeout(5000));
    return firstValueFrom(result$);
  }
}
