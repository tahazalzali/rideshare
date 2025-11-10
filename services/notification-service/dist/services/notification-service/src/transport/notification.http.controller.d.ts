import { NotificationDto } from '@rides/common';
export declare class NotificationHttpController {
    send(body: NotificationDto): {
        accepted: boolean;
        echo: NotificationDto;
    };
}
