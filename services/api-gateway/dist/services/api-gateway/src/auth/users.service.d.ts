export interface User {
    id: number;
    email: string;
    passwordHash: string;
    roles: string[];
}
export declare class UsersService {
    private users;
    private idCounter;
    private hash;
    register(email: string, password: string, roles: string[]): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    validate(email: string, password: string): Promise<User | null>;
}
