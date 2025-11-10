import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@rides/common';
import { PassengerService } from '../domain/passenger.service';
export declare class PassengerMessageController {
    private passengers;
    private rmq;
    constructor(passengers: PassengerService, rmq: RmqService);
    create(payload: {
        name: string;
        email: string;
    }, ctx: RmqContext): Promise<import("../domain/passenger.entity").Passenger>;
}
