import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, Post, ValidationPipe, Param, BadRequestException } from '@nestjs/common';
import { UsersService } from '../common/core/services/users.service';
import { RolesGuard, Roles } from 'src/common';
import { CompaniesService } from 'src/common/core/services/companies.service';
import { OrderService } from 'src/common/core/services/order.service';
import { CompanyDTO } from 'src/models/company.dto';
import { Company } from 'src/data/entities/company.entity';
import { Price } from 'src/data/entities/prices.entity';
import { PricesService } from 'src/common/core/services/prices.service';
import { PriceRequestDTO } from 'src/models/prices/price-request.dto';

@Controller('prices')
export class PricesController {

    constructor(
        private readonly usersService: UsersService,
        private readonly ordersService: OrderService,
        private readonly companiesService: CompaniesService,
        private priceService: PricesService,
    ) { }

    @Get('lastPrice')
    async getLatestForAllCompanies(): Promise<Price[]> {
        return await this.priceService.getLastPricePerCompany();
    }

    @Get('prices/company')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async getPrices(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) priceRequest: PriceRequestDTO): Promise<object> {

        return await this.priceService.getCompanyPrices(priceRequest.id, priceRequest.lastN, priceRequest.startdate, priceRequest.enddate);
    }
}
