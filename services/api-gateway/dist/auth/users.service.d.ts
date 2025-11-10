import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly repo;
    constructor(repo: Repository<User>);
    private hash;
    register(email: string, password: string, roles: string[]): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    validate(email: string, password: string): Promise<User | null>;
}
