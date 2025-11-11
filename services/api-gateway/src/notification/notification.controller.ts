import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { NotificationDto, PATTERNS, Roles } from '@rides/common';
import { firstValueFrom, timeout } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@rides/common';

const NOTIFICATION_BODY_EXAMPLE: NotificationDto = {
  to: 'passenger_01J89YXW',
  message: 'Your driver is outside. Please meet at the pickup point.',
};

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'v1/notifications' })
export class NotificationController {
  constructor(@Inject('NOTIFICATION') private readonly notificationClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Send a notification (demo no-op)' })
  @ApiBody({ schema: { example: NOTIFICATION_BODY_EXAMPLE } })
  @ApiResponse({ status: 202, description: 'Notification accepted', schema: { example: { accepted: true } } })
  @Roles('Admin')
  async send(@Body() dto: NotificationDto) {
    const result$ = this.notificationClient.send(PATTERNS.NOTIFICATION.SEND, dto).pipe(timeout(3000));
    await firstValueFrom(result$);
    return { accepted: true };
  }
}
