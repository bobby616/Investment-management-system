import { User } from 'src/data/entities/user.entity';
import { Funds } from './../../../data/entities/funds.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FundDTO } from '../../../models/funds/fund.dto';
import { AddSubstractFundDTO } from '../../../models/funds/add-substract-fund.dto';
import { Client } from 'src/data/entities/client.entity';

@Injectable()
export class FundsService {
    constructor(
        @InjectRepository(Funds)
        private readonly fundRepository: Repository<Funds>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) { }
    async createFund(fundDTO: FundDTO) {
        const foundUser: Client = await this.clientRepository.findOne({ id: fundDTO.client_id });
        if (!foundUser) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }

        const createFund: Funds = await this.fundRepository.create();
        createFund.currentamount = fundDTO.amount;

        await this.fundRepository.save(createFund);
        return await this.clientRepository.update({ id: fundDTO.client_id }, { funds: createFund });
    }

    async addToFund(fundDTO: AddSubstractFundDTO) {
        const foundFund: Funds = await this.fundRepository.findOne({ id: fundDTO.id });
        if (!foundFund) {
            throw new HttpException('Fund not found!', HttpStatus.NOT_FOUND);
        }

        return await this.fundRepository.update({ id: fundDTO.id }, { currentamount: foundFund.currentamount + fundDTO.amount });

    }
    async substractFund(fundDTO: AddSubstractFundDTO) {
        const clientFound: Client = await this.clientRepository.findOne({where: { id: fundDTO.id }});

        if (!clientFound) {
            throw new HttpException('Fund not found!', HttpStatus.NOT_FOUND);
        }
        if (clientFound.funds.currentamount < fundDTO.amount) {
            throw new Error('Current amount is less than the amount you want to extract');
        }

        const newfunds = clientFound.funds.currentamount - fundDTO.amount;
        return await this.fundRepository.update({ id: clientFound.funds.id }, { currentamount: newfunds });
    }

    async currentFund(client_id: string) {
        const clientFound = await this.clientRepository.findOne({ where: { id: client_id } });

        if (!clientFound) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }

        return await clientFound.funds.currentamount;
    }
}