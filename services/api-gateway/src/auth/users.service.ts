import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  roles: string[];
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  private hash(pw: string): string {
    return createHash('sha256').update(pw).digest('hex');
  }

  async register(email: string, password: string, roles: string[]) {
    const user: User = { 
      id: this.idCounter++, 
      email, 
      passwordHash: this.hash(password), 
      roles 
    };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  async validate(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    return user.passwordHash === this.hash(password) ? user : null;
  }
}
