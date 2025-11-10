import { Test } from '@nestjs/testing';
import { PaymentService } from '../../src/domain/payment.service';
import { PaymentAuth } from '../../src/domain/payment-auth.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PaymentService (unit)', () => {
  it('authorizes and captures payment', async () => {
    const repo = {
      create: (d:any) => d,
      save: async (d:any) => ({ ...d, id: 'a1' }),
      update: jest.fn(),
    } as unknown as Repository<PaymentAuth>;
    const module = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: getRepositoryToken(PaymentAuth), useValue: repo },
      ],
    }).compile();
    const svc = module.get(PaymentService);
    const auth = await svc.authorize('t1', 'p1', 42);
    expect(auth.id).toBe('a1');
    await svc.capture('a1');
    await svc.release('a1');
    expect((repo as any).update).toHaveBeenCalledTimes(2);
  });
});
