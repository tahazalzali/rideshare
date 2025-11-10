export declare class BookTripDto {
    passengerId: string;
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
}
export declare class TripStatusDto {
    id: string;
    status: string;
    price: number;
    driverId?: string;
    paymentAuthId?: string;
    currency: string;
}
