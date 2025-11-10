import { Test } from '@nestjs/testing';
import { PassengerService } from '../../src/domain/passenger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from '../../src/domain/passenger.entity';

describe('PassengerService', () => {
  it('creates a passenger', async () => {
    const repo = {
      create: jest.fn().mockImplementation((x) => x),
      save: jest.fn().mockImplementation(async (x) => ({ ...x, id: 'uuid' })),
    } as unknown as Repository<Passenger>;
    const module = await Test.createTestingModule({
      providers: [
        PassengerService,
        { provide: getRepositoryToken(Passenger), useValue: repo }
      ]
    }).compile();
    const service = module.get(PassengerService);
    const out = await service.create({ name: 'A', email: 'a@x.com' });
    expect(out.id).toBeDefined();
  });
});
