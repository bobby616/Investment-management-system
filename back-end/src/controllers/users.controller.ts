import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../common/core/services/users.service';
import { RolesGuard, Roles } from 'src/common';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get('all')
  /* @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard) */
  all() {
    return this.usersService.getAllUsers();
  }

  @Get('/clients')
  all1() {
    return this.usersService.getAllClients();
  }
}
