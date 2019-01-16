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
import { User } from './user.entity';

@Entity({
  name: 'clients',
})
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.clients)
  manager: User;

  @OneToOne(type => Watchlist, watchlist => watchlist.client)
  @JoinColumn()
  watchlist: Promise<Watchlist>;

  @OneToOne(type => Funds, funds => funds.client, { eager: true})
  @JoinColumn()
  funds: Funds;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  dateregistered: Date;

  @Column({ unique: true })
  email: string;

  @OneToMany(type => Order, order => order.client)
  orders: Promise<Order[]>;
}
