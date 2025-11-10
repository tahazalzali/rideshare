export declare class PricingService {
    estimate(pickupLat: number, pickupLng: number, dropLat: number, dropLng: number): {
        currency: string;
        amount: number;
    };
}
