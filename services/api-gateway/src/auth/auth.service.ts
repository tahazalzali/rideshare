import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private users: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.users.validate(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
