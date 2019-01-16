import { Company } from './company.entity';
import { User } from './user.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Client } from './client.entity';

@Entity({
  name: 'watchlists',
})
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Client, client => client.watchlist)
  client: Promise<Client>;

  @ManyToMany(type => Company, company => company.watchlists, { eager: true, cascade: true})
  @JoinTable()
  companies: Company[];
}
