import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationDto, PATTERNS, Roles } from '@rides/common';
import { firstValueFrom, timeout } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@rides/common';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/notifications' })
export class NotificationController {
  constructor(@Inject('NOTIFICATION') private readonly notificationClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Send a notification (demo no-op)' })
  @ApiResponse({ status: 202, description: 'Notification accepted' })
  @Roles('Admin')
  async send(@Body() dto: NotificationDto) {
    const result$ = this.notificationClient.send(PATTERNS.NOTIFICATION.SEND, dto).pipe(timeout(3000));
    await firstValueFrom(result$);
    return { accepted: true };
  }
}
