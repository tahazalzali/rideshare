import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from '../domain/trip.entity';

@Injectable()
export class TripRepository {
  constructor(@InjectRepository(Trip) private readonly repo: Repository<Trip>) {}

  async save(trip: Partial<Trip>): Promise<Trip> {
    return this.repo.save(trip);
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async findByPassengerId(passengerId: string): Promise<Trip[]> {
    return this.repo.find({ 
      where: { passengerId },
      order: { createdAt: 'DESC' }
    });
  }

  async findByDriverId(driverId: string): Promise<Trip[]> {
    return this.repo.find({ 
      where: { driverId },
      order: { createdAt: 'DESC' }
    });
  }
}
