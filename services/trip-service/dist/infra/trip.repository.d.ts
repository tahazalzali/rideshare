import { Repository } from 'typeorm';
import { Trip } from '../domain/trip.entity';
export declare class TripRepository {
    private readonly repo;
    constructor(repo: Repository<Trip>);
    save(trip: Partial<Trip>): Promise<Trip>;
    findById(id: string): Promise<Trip | null>;
}
