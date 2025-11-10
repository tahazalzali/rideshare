import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TripService } from '../domain/trip.service';

@ApiTags('internal')
@Controller('internal/trips')
export class TripHttpController {
  constructor(private trips: TripService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a trip by id (read model)' })
  @ApiResponse({ status: 200, description: 'Trip found' })
  get(@Param('id') id: string) {
    return this.trips.get(id);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Start a trip' })
  @ApiResponse({ status: 200, description: 'Trip started' })
  start(@Param('id') id: string) {
    return this.trips.start(id);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a trip' })
  @ApiResponse({ status: 200, description: 'Trip completed' })
  complete(@Param('id') id: string) {
    return this.trips.complete(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a trip' })
  @ApiResponse({ status: 200, description: 'Trip cancelled' })
  cancel(@Param('id') id: string, @Body() body: { reason?: string }) {
    return this.trips.cancel(id, body.reason);
  }

  @Get('passenger/:passengerId')
  @ApiOperation({ summary: 'Get trips by passenger ID' })
  @ApiResponse({ status: 200, description: 'Trips found' })
  getPassengerTrips(@Param('passengerId') passengerId: string) {
    return this.trips.getPassengerTrips(passengerId);
  }

  @Get('driver/:driverId')
  @ApiOperation({ summary: 'Get trips by driver ID' })
  @ApiResponse({ status: 200, description: 'Trips found' })
  getDriverTrips(@Param('driverId') driverId: string) {
    return this.trips.getDriverTrips(driverId);
  }
}
