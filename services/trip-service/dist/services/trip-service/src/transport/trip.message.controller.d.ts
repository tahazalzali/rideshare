import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@rides/common';
import { TripService } from '../domain/trip.service';
export declare class TripMessageController {
    private trips;
    private rmq;
    constructor(trips: TripService, rmq: RmqService);
    book(payload: any, ctx: RmqContext): Promise<{
        id: string;
        status: import("../domain/trip.entity").TripStatus;
        price: number;
        currency: string;
        driverId: string | undefined;
        paymentAuthId: string | undefined;
    }>;
    get(id: string, ctx: RmqContext): Promise<{
        id: string;
        status: import("../domain/trip.entity").TripStatus;
        price: number;
        currency: string;
        driverId: string | undefined;
        paymentAuthId: string | undefined;
    } | null>;
}
