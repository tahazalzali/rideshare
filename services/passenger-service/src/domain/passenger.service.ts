import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Passenger } from './passenger.entity';

@Injectable()
export class PassengerService {
  constructor(@InjectRepository(Passenger) private readonly repo: Repository<Passenger>) {}

  async create(data: { name: string; email: string }) {
    const email = data.email.trim().toLowerCase();
    const existing = await this.repo.findOne({ where: { email } });
    if (existing) return existing;

    const p = this.repo.create({
      name: data.name.trim(),
      email,
    });
    return this.repo.save(p);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  list(search?: string) {
    if (search?.trim()) {
      const term = `%${search.trim()}%`;
      return this.repo.find({ 
        where: [{ name: ILike(term) }, { email: ILike(term) }],
        order: { createdAt: 'DESC' },
        take: 100,
      });
    }

    return this.repo.find({
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }
}
