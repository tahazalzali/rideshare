import { Repository } from 'typeorm';
import { Passenger } from './passenger.entity';
export declare class PassengerService {
    private readonly repo;
    constructor(repo: Repository<Passenger>);
    create(data: {
        name: string;
        email: string;
    }): Promise<Passenger>;
    findById(id: string): Promise<Passenger | null>;
}
