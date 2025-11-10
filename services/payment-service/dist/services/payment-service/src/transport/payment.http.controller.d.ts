import { PaymentService } from '../domain/payment.service';
import { PaymentAuthorizeDto, PaymentActionDto } from '@rides/common';
export declare class PaymentHttpController {
    private payments;
    constructor(payments: PaymentService);
    authorize(body: PaymentAuthorizeDto): Promise<import("../domain/payment-auth.entity").PaymentAuth>;
    capture(body: PaymentActionDto): Promise<{
        ok: boolean;
    }>;
    release(body: PaymentActionDto): Promise<{
        ok: boolean;
    }>;
}
