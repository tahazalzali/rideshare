import { ClientProxy } from '@nestjs/microservices';
import { TripRepository } from '../infra/trip.repository';
import { Trip } from './trip.entity';
export declare class TripService {
    private repo;
    private pricing;
    private payment;
    private driver;
    private readonly logger;
    constructor(repo: TripRepository, pricing: ClientProxy, payment: ClientProxy, driver: ClientProxy);
    book(payload: {
        passengerId: string;
        pickupLat: number;
        pickupLng: number;
        dropoffLat: number;
        dropoffLng: number;
    }): Promise<Trip>;
    get(id: string): Promise<Trip | null>;
}
