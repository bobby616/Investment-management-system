import { Company } from './company.entity';
import { Status } from './status.entity';
import { User } from './user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Client } from './client.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Client, client => client.orders)
  client: Promise<Client>;

  @Column()
  opendate: Date;

  @Column({ nullable: true, default: null })
  closedate: Date;

  @ManyToOne(type => Company, company => company.orders, {eager: true})
  company: Company;

  @Column()
  openPrice: number;

  @Column({ nullable: true, default: null })
  closePrice: number;

  @Column()
  units: number;

  @ManyToOne(type => Status, status => status.orders, { eager: true })
  status: Status;

  @Column({ nullable: true, default: null })
  result: number;
  @Column()
  direction: string;
}
