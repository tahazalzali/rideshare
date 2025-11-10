import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
export declare class DriverService {
    private readonly repo;
    constructor(repo: Repository<Driver>);
    findAvailableNear(_lat: number, _lng: number): Promise<Driver | null>;
    assign(driverId: string): Promise<void>;
}
