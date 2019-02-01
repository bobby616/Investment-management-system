import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, Post, ValidationPipe, Param } from '@nestjs/common';
import { UsersService } from '../common/core/services/users.service';
import { RolesGuard, Roles } from 'src/common';
import { CompaniesService } from 'src/common/core/services/companies.service';
import { OrderService } from 'src/common/core/services/order.service';
import { CompanyDTO } from 'src/models/company.dto';
import { Company } from 'src/data/entities/company.entity';

@Controller('stocks')
export class StocksController {

  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrderService,
    private readonly companiesService: CompaniesService,
  ) { }

  @Get('/all')
  async getAllStocks(): Promise<Company[]> {
    return this.companiesService.getAllCompanies();
  }

  @Post('/create')
  async createCompany(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) company: CompanyDTO): Promise<Company> {
    return this.companiesService.createCompany(company);
  }

  @Post('/update')
  async updateCompany(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) company: CompanyDTO, companyId): Promise<Company> {
    return this.companiesService.updateCompany(companyId, company);
  }

  @Get('/industry/:id')
  async getCompaniesByIndustry(@Param('id') id: string): Promise<Company[]> {
    return this.companiesService.getCompaniesByIndustry(id);
  }

  @Get('/industry/:id')
  async getCompaniesTimesListed(@Param('id') id: string): Promise<number> {
    return this.companiesService.getCompanyTimesListed(id);
  }

  // shitty, I know but I didn't have time
  @Post('/abbreviature')
    getCompany(@Body() abbr: string) {
        return this.companiesService.getCompany(abbr);
    }
}
