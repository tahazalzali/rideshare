import { TripService } from '../domain/trip.service';
export declare class TripHttpController {
    private trips;
    constructor(trips: TripService);
    get(id: string): Promise<import("../domain/trip.entity").Trip | null>;
}
