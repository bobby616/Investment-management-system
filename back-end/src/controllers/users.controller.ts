import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, ValidationPipe, Body, Param } from '@nestjs/common';
import { UsersService } from '../common/core/services/users.service';
import { RolesGuard, Roles } from 'src/common';
import { RegisterDTO } from 'src/models/user/register.dto';
import { User } from 'src/data/entities/user.entity';
import { ClientRegisterDTO } from 'src/models/user/client-register.dto';
import { Client } from 'src/data/entities/client.entity';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get('all')
  /* @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard) */
  all() {
    return this.usersService.getAllManagers();
  }

  @Get('/clients')
  allClients() {
    return this.usersService.getAllClients();
  }

  @Get('/getClient/:id')
  getClientById(@Param('id') id: string) {
    return this.usersService.getClient(id);
  }

  @Get('/getManager/:id')
  getManagerById(@Param('id') id: string) {
    return this.usersService.getManager(id);
  }

  @Post('/createManager')
  async createManager(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) manager: RegisterDTO): Promise<User> {
    return this.usersService.createManager(manager);
  }

  @Post('/createAdmin')
  async createAdmin(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) admin: RegisterDTO): Promise<User> {
    return this.usersService.createAdmin(admin);
  }

  @Post('/createClient')
  async createClient(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) client: ClientRegisterDTO): Promise<Client> {
    return this.usersService.createClient(client);
  }
}