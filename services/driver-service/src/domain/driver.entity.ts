import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: true })
  available!: boolean;

  @Column('float', { default: 0 })
  lat!: number;

  @Column('float', { default: 0 })
  lng!: number;
}
