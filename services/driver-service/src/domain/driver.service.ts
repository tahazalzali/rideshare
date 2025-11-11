import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(@InjectRepository(Driver) private readonly repo: Repository<Driver>) {}

  async findAvailableNear(lat: number, lng: number): Promise<Driver | null> {
    let driver = await this.repo.findOne({ where: { available: true } });
   //temp for demo
   if (!driver) {
      driver = this.repo.create({
        name: 'Demo Driver',
        available: true,
        lat,
        lng,
      });
      driver = await this.repo.save(driver);
    }
    return driver;
  }

  async assign(driverId: string) {
    await this.repo.update({ id: driverId }, { available: false });
  }

  async create(data: { name: string; lat: number; lng: number }) {
    const driver = this.repo.create({
      name: data.name.trim(),
      lat: data.lat,
      lng: data.lng,
      available: true,
    });
    return this.repo.save(driver);
  }
}
