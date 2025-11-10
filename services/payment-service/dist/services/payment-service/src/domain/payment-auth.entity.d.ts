export declare class PaymentAuth {
    id: string;
    tripId: string;
    passengerId: string;
    amount: number;
    status: 'authorized' | 'released' | 'captured';
    createdAt: Date;
}
