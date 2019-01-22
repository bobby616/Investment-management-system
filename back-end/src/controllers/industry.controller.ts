import { UsersService } from "src/common/core/services/users.service";
import { OrderService } from "src/common/core/services/order.service";
import { CompaniesService } from "src/common/core/services/companies.service";
import { FundsService } from "src/common/core/services/funds.service";
import { Controller, Get, Post, Body, ValidationPipe } from "@nestjs/common";
import { IndustriesService } from "src/common/core/services/industry.service";
import { IndustryDTO } from "src/models/industry/industry.dto";
import { IndustryUpdateDTO } from "src/models/industry/industryUpdate.dto";

@Controller('industry')
export class IndustryController {

    constructor(
        private readonly usersService: UsersService,
        private readonly ordersService: OrderService,
        private readonly companiesService: CompaniesService,
        private readonly fundsService: FundsService,
        private readonly industryService: IndustriesService,
    ) { }

    @Get('/all')
    async getAllIndustries() {
        return this.industryService.getAllIndustries();
    }

    @Post('/create')
    async createIndustry(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) industry: IndustryDTO) {
        return this.industryService.createIndustry(industry);
    }

    @Post('/update')
    async updateIndustry(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) industry: IndustryUpdateDTO) {
        return this.industryService.updateIndustry(industry);
    }
}
