import { RmqContext } from '@nestjs/microservices';
import { RmqService } from '@rides/common';
import { PaymentService } from '../domain/payment.service';
export declare class PaymentMessageController {
    private payments;
    private rmq;
    constructor(payments: PaymentService, rmq: RmqService);
    authorize(payload: {
        tripId: string;
        passengerId: string;
        amount: number;
    }, ctx: RmqContext): Promise<{
        authorizationId: string;
        status: "authorized" | "released" | "captured";
    }>;
    capture(payload: {
        authorizationId: string;
    }, ctx: RmqContext): Promise<{
        ok: boolean;
    }>;
    release(payload: {
        authorizationId: string;
    }, ctx: RmqContext): Promise<{
        ok: boolean;
    }>;
}
