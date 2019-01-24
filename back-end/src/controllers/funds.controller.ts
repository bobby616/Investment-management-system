import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, Post, ValidationPipe, Param } from '@nestjs/common';
import { UsersService } from '../common/core/services/users.service';
import { RolesGuard, Roles } from 'src/common';
import { CompaniesService } from 'src/common/core/services/companies.service';
import { OrderService } from 'src/common/core/services/order.service';
import { CompanyDTO } from 'src/models/company.dto';
import { Company } from 'src/data/entities/company.entity';
import { Funds } from 'src/data/entities/funds.entity';
import { FundDTO } from 'src/models/funds/fund.dto';
import { FundsService } from 'src/common/core/services/funds.service';
import { AddSubstractFundDTO } from 'src/models/funds/add-substract-fund.dto';

@Controller('funds')
export class FundsController {

    constructor(
        private readonly usersService: UsersService,
        private readonly ordersService: OrderService,
        private readonly companiesService: CompaniesService,
        private readonly fundsService: FundsService,
    ) { }


    @Get('/client/:id')
    async getCurrendFund(@Param('id') clientId: string): Promise<number> {
        return this.fundsService.currentFund(clientId);
    }

    @Post('/create')
    async createCompany(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) fund: FundDTO) {
        return this.fundsService.createFund(fund);
    }

    @Post('/add')
    async addToFund(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) fund: AddSubstractFundDTO) {
        return this.fundsService.addToFund(fund);
    }

    @Post('/substract')
    async substractToFund(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) fund: AddSubstractFundDTO) {
        return this.fundsService.substractFund(fund);
    }


}
