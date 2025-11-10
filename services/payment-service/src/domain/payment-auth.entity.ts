import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class PaymentAuth {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  tripId!: string;

  @Column()
  passengerId!: string;

  @Column('float')
  amount!: number;

  @Column({ default: 'authorized' })
  status!: 'authorized' | 'released' | 'captured';

  @CreateDateColumn()
  createdAt!: Date;
}
