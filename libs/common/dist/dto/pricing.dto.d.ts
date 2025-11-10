export declare class EstimatePriceDto {
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
    serviceLevel?: 'standard' | 'premium' | 'xl';
}
export declare class PriceBreakdownDto {
    base: number;
    distanceComponent: number;
    durationComponent: number;
    minimumFare: number;
}
export declare class PriceQuoteDto {
    currency: string;
    amount: number;
    serviceLevel?: 'standard' | 'premium' | 'xl';
    surgeMultiplier?: number;
    distanceKm?: number;
    durationMinutes?: number;
    breakdown?: PriceBreakdownDto;
}
