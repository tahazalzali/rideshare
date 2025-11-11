import { Body, Controller, Get, Inject, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PATTERNS, TripStatusDto, BookTripDto } from '@rides/common';
import { firstValueFrom, timeout } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@rides/common';
import { RolesGuard } from '@rides/common';

const BOOK_TRIP_EXAMPLE: BookTripDto = {
  passengerId: 'a4c6f9d8-3bcb-4c6a-bc9a-6d590d123456',
  pickupLat: 37.7749,
  pickupLng: -122.4194,
  dropoffLat: 37.7841,
  dropoffLng: -122.4094,
};

const TRIP_STATUS_EXAMPLE: TripStatusDto = {
  id: 'trip_01J8ABCXYZ',
  status: 'driver_assigned',
  price: 1850,
  driverId: 'driver_42',
  paymentAuthId: 'auth_789',
  currency: 'USD',
};

@ApiTags('trips')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/trips' })
export class TripController {
  constructor(@Inject('TRIP') private readonly tripClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Book a new trip' })
  @ApiBody({ schema: { example: BOOK_TRIP_EXAMPLE } })
  @ApiResponse({ status: 201, description: 'Trip request accepted', schema: { example: TRIP_STATUS_EXAMPLE } })
  @Roles('Passenger')
  async book(@Body() dto: BookTripDto): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, BookTripDto>(PATTERNS.TRIP.BOOK, dto).pipe(timeout(8000));
    return firstValueFrom(result$);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip status by id' })
  @ApiParam({ name: 'id', example: 'trip_01J8ABCXYZ' })
  @ApiResponse({ status: 200, description: 'Trip found', schema: { example: TRIP_STATUS_EXAMPLE } })
  @Roles('Passenger', 'Driver', 'Admin')
  async get(@Param('id') id: string): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, string>(PATTERNS.TRIP.GET, id).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Start a trip (Driver only)' })
  @ApiParam({ name: 'id', example: 'trip_01J8ABCXYZ' })
  @ApiResponse({ status: 200, description: 'Trip started', schema: { example: TRIP_STATUS_EXAMPLE } })
  @Roles('Driver')
  async start(@Param('id') id: string): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, string>(PATTERNS.TRIP.START, id).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a trip (Driver only)' })
  @ApiParam({ name: 'id', example: 'trip_01J8ABCXYZ' })
  @ApiResponse({ status: 200, description: 'Trip completed', schema: { example: TRIP_STATUS_EXAMPLE } })
  @Roles('Driver')
  async complete(@Param('id') id: string): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto, string>(PATTERNS.TRIP.COMPLETE, id).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a trip' })
  @ApiParam({ name: 'id', example: 'trip_01J8ABCXYZ' })
  @ApiBody({ schema: { example: { reason: 'Passenger running late' } } })
  @ApiResponse({ status: 200, description: 'Trip cancelled', schema: { example: TRIP_STATUS_EXAMPLE } })
  @Roles('Passenger', 'Driver', 'Admin')
  async cancel(@Param('id') id: string, @Body() body: { reason?: string }): Promise<TripStatusDto> {
    const result$ = this.tripClient.send<TripStatusDto>(PATTERNS.TRIP.CANCEL, { id, reason: body.reason }).pipe(timeout(5000));
    return firstValueFrom(result$);
  }
}
