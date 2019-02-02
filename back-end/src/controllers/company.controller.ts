import { Controller, Get, Param } from "@nestjs/common";
import { CompaniesService } from "src/common/core/services/companies.service";
import { Company } from "src/data/entities/company.entity";

@Controller('company')
export class CompanyController {

    constructor(private readonly companyService: CompaniesService) {

    }

    @Get('/:abb')
    async getCompanyByAbb(@Param('abb') abb: string): Promise<Company> {
       return await this.companyService.getCompany(abb)
    }
}