import { AuthService } from './auth.service';
import { UsersService } from './users.service';
declare class LoginDto {
    email: string;
    password: string;
}
declare class RegisterDto {
    email: string;
    password: string;
    roles: string[];
}
export declare class AuthController {
    private auth;
    private users;
    constructor(auth: AuthService, users: UsersService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(dto: RegisterDto): Promise<import("./users.service").User>;
}
export {};
