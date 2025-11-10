import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(@InjectRepository(Driver) private readonly repo: Repository<Driver>) {}

  async findAvailableNear(_lat: number, _lng: number): Promise<Driver | null> {
    return this.repo.findOne({ where: { available: true } });
  }

  async assign(driverId: string) {
    await this.repo.update({ id: driverId }, { available: false });
  }
}
