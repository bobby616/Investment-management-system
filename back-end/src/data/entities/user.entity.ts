import { Funds } from './funds.entity';
import { Order } from './order.entity';
import { Watchlist } from './watchlist.entity';
import { Role } from './role.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './client.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Role, role => role.users, { eager: true })
  role: Role;

  @OneToMany(type => Client, client => client.manager)
  clients: Promise<Client[]>;

  @Column({ default: '' })
  fullname: string;

  @Column()
  dateregistered: Date;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  password: string;
}
