import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NotificationDto } from '@rides/common';

@ApiTags('internal')
@Controller('internal/notifications')
export class NotificationHttpController {
  @Post()
  @ApiOperation({ summary: 'Send a notification (logs only)' })
  send(@Body() body: NotificationDto) {
    // No-op in demo: handled by message controller in real flows
    return { accepted: true, echo: body };
  }
}
