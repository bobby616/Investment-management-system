import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { UsersService } from '../common/core/services/users.service';
import { RolesGuard, Roles } from 'src/common';
import { OrderService } from 'src/common/core/services/order.service';
import { ClientsService } from 'src/common/core/services/clients.service';

@Controller('clients')
export class ClientsController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get('orders')
  all() {
  }

  @Get(':id/stocks')
  myStocks() {

  }

  @Get('/all')
  /* @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard) */
  allClients() {
    return this.usersService.getAllClients();
  }

}
