import { User } from './user.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity({
  name: 'funds',
})
export class Funds {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => Client, client  => client.funds)
    client: Promise<Client>;

    @Column({ default: 0 })
    currentamount: number;
}
