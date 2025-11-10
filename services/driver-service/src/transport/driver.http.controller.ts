import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DriverService } from '../domain/driver.service';
import { FindDriverDto, AssignDriverDto } from '@rides/common';

@ApiTags('internal')
@Controller('internal/driver')
export class DriverHttpController {
  constructor(private drivers: DriverService) {}

  @Get('available')
  @ApiOperation({ summary: 'Find an available driver near coordinates' })
  available(@Query() q: FindDriverDto) {
    return this.drivers.findAvailableNear(Number(q.lat), Number(q.lng));
  }

  @Post('assign')
  @ApiOperation({ summary: 'Mark a driver as assigned' })
  assign(@Body() body: AssignDriverDto) {
    return this.drivers.assign(body.driverId).then(() => ({ ok: true }));
  }
}
