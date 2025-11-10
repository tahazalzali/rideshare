import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
export declare class AuthService {
    private jwt;
    private users;
    constructor(jwt: JwtService, users: UsersService);
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
