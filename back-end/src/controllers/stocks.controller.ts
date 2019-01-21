import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { UsersService } from '../common/core/services/users.service';
import { RolesGuard, Roles } from 'src/common';
import { CompaniesService } from 'src/common/core/services/companies.service';
import { OrderService } from 'src/common/core/services/order.service';

@Controller('stocks')
export class StocksController {

  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrderService,
    private readonly companiesService: CompaniesService,
  ) { }

  @Get('all')
  @Roles('manager')
  @UseGuards(AuthGuard(), RolesGuard)
  all() {
    return this.companiesService.getAllCompanies();
  }
}
