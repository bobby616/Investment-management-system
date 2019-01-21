import { Company } from '../../../data/entities/company.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from '../../../data/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchlist } from 'src/data/entities/watchlist.entity';
import { OrderDTO } from 'src/models/order/order.dto';
@Injectable()
export class ClientsService {

    constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
    )

    {}

}