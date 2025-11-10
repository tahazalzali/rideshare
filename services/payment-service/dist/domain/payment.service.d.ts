import { Repository } from 'typeorm';
import { PaymentAuth } from './payment-auth.entity';
export declare class PaymentService {
    private readonly repo;
    constructor(repo: Repository<PaymentAuth>);
    authorize(tripId: string, passengerId: string, amount: number): Promise<PaymentAuth>;
    capture(authId: string): Promise<{
        ok: boolean;
    }>;
    release(authId: string): Promise<{
        ok: boolean;
    }>;
}
