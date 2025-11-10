export type TripStatus = 'REQUESTED' | 'PRICED' | 'AUTHORIZED' | 'DRIVER_ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export declare class Trip {
    id: string;
    passengerId: string;
    driverId?: string;
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
    status: TripStatus;
    price: number;
    currency: string;
    paymentAuthId?: string;
    createdAt: Date;
}
