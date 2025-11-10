import { Test } from '@nestjs/testing';
import { DriverService } from '../../src/domain/driver.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../../src/domain/driver.entity';

describe('DriverService (unit)', () => {
  it('marks a driver assigned', async () => {
    const repo = { update: jest.fn(), findOne: jest.fn() } as unknown as Repository<Driver>;
    const module = await Test.createTestingModule({
      providers: [
        DriverService,
        { provide: getRepositoryToken(Driver), useValue: repo },
      ],
    }).compile();
    const svc = module.get(DriverService);
    await svc.assign('d1');
    expect((repo as any).update).toHaveBeenCalledWith({ id: 'd1' }, { available: false });
  });
});
