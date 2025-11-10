import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@rides/common';
import { DriverService } from '../domain/driver.service';
export declare class DriverMessageController {
    private drivers;
    private rmq;
    constructor(drivers: DriverService, rmq: RmqService);
    findAvailable(payload: {
        lat: number;
        lng: number;
    }, ctx: RmqContext): Promise<{
        driverId: string;
    } | null>;
    assign(payload: {
        driverId: string;
    }, ctx: RmqContext): Promise<{
        ok: boolean;
    }>;
}
