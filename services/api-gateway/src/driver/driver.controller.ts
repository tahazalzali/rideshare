import { Body, Controller, Get, Inject, Patch, Param, Query, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard, PATTERNS, CreateDriverDto, FindDriverDto } from '@rides/common';
import { firstValueFrom, timeout } from 'rxjs';

const DRIVER_EXAMPLE = {
  id: 'd2b7f1c4-1234-4d5a-9b7c-abcde0123456',
  name: 'Jane Doe',
  available: true,
  lat: 37.7749,
  lng: -122.4194,
  createdAt: '2024-05-10T09:00:00.000Z',
  updatedAt: '2024-05-10T09:00:00.000Z',
};

@ApiTags('drivers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/drivers' })
export class DriverController {
  constructor(@Inject('DRIVER') private readonly drivers: ClientProxy) {}

  @Get('available')
  @ApiOperation({ summary: 'Find an available driver near coordinates' })
  @ApiQuery({ name: 'lat', example: 37.7749 })
  @ApiQuery({ name: 'lng', example: -122.4194 })
  @ApiResponse({
    status: 200,
    description: 'Driver found (null if none)',
    schema: { example: { driverId: 'd2b7f1c4-1234-4d5a-9b7c-abcde0123456' } },
  })
  @Roles('Admin')
  async findAvailable(@Query() query: FindDriverDto) {
    const result$ = this.drivers
      .send(PATTERNS.DRIVER.FIND_AVAILABLE, { lat: Number(query.lat), lng: Number(query.lng) })
      .pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Mark a driver as assigned/unavailable' })
  @ApiParam({ name: 'id', example: 'd2b7f1c4-1234-4d5a-9b7c-abcde0123456' })
  @ApiResponse({ status: 200, description: 'Driver marked unavailable', schema: { example: { ok: true } } })
  @Roles('Admin')
  async assign(@Param('id') id: string) {
    const result$ = this.drivers.send(PATTERNS.DRIVER.ASSIGN, { driverId: id }).pipe(timeout(5000));
    return firstValueFrom(result$);
  }

  @Post()
  @ApiOperation({ summary: 'Create an available driver (admin utility)' })
  @ApiBody({
    type: CreateDriverDto,
    schema: { example: { name: 'Jane Doe', lat: 37.7749, lng: -122.4194 } },
  })
  @ApiResponse({ status: 201, description: 'Driver created', schema: { example: DRIVER_EXAMPLE } })
  @Roles('Admin')
  async create(@Body() dto: CreateDriverDto) {
    const result$ = this.drivers.send(PATTERNS.DRIVER.CREATE, dto).pipe(timeout(5000));
    return firstValueFrom(result$);
  }
}
