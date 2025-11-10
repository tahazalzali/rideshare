import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type TripStatus = 'REQUESTED' | 'PRICED' | 'AUTHORIZED' | 'DRIVER_ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  passengerId!: string;

  @Column({ nullable: true })
  driverId?: string;

  @Column('float') pickupLat!: number;
  @Column('float') pickupLng!: number;
  @Column('float') dropoffLat!: number;
  @Column('float') dropoffLng!: number;

  @Column({ default: 'REQUESTED' })
  status!: TripStatus;

  @Column('float', { default: 0 })
  price!: number;

  @Column({ default: 'USD' })
  currency!: string;

  @Column({ nullable: true })
  paymentAuthId?: string;

  @Column({ nullable: true })
  cancellationReason?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
