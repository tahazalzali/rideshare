import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentAuth } from './payment-auth.entity';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(PaymentAuth) private readonly repo: Repository<PaymentAuth>) {}

  async authorize(tripId: string, passengerId: string, amount: number) {
    const auth = this.repo.create({ tripId, passengerId, amount, status: 'authorized' });
    return this.repo.save(auth);
  }
  async capture(authId: string) {
    await this.repo.update({ id: authId }, { status: 'captured' });
    return { ok: true };
  }
  async release(authId: string) {
    await this.repo.update({ id: authId }, { status: 'released' });
    return { ok: true };
  }
}
