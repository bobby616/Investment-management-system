import { ClientRegisterDTO } from './../../../models/user/client-register.dto';
import { GetUserDTO } from '../../../models/user/get-user.dto';
import { UserLoginDTO } from '../../../models/user/user-login.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, AdvancedConsoleLogger } from 'typeorm';
import { User } from '../../../data/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../../interfaces/jwt-payload';
import { Role } from '../../../data/entities/role.entity';
import { Funds } from '../../../data/entities/funds.entity';
import { RegisterDTO } from '../../../models/user/register.dto';
import { Client } from 'src/data/entities/client.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Funds)
    private readonly fundsRepository: Repository<Funds>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  // ==> Only admin can register new client and managers profiles
  async createManager(manager: RegisterDTO): Promise<User> {
    const foundManager = await this.usersRepository.findOne({ email: manager.email });
    if (foundManager) {
      throw new BadRequestException('Email already exist');
    }

    try {
      const managerRole = await this.roleRepository.findOne({ rolename: 'manager' });
      const newManager = await this.usersRepository.create();

      newManager.fullname = manager.fullname;
      newManager.email = manager.email;
      newManager.password = manager.password = await bcrypt.hash(manager.password, 10);
      newManager.dateregistered = new Date();
      newManager.role = managerRole;

      return await this.usersRepository.save(newManager);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createAdmin(admin: RegisterDTO): Promise<User> {
    const foundAdmin = await this.usersRepository.findOne({ email: admin.email });
    if (foundAdmin) {
      throw new BadRequestException('Email already exist');
    }
    try {
      const role = await this.roleRepository.findOne({ rolename: 'admin' });
      const newAdmin = await this.usersRepository.create();
      newAdmin.fullname = admin.fullname;
      newAdmin.email = admin.email;
      newAdmin.dateregistered = new Date();
      newAdmin.role = role;
      newAdmin.password = admin.password = await bcrypt.hash(admin.password, 10);
      return await this.usersRepository.save(newAdmin);

    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createClient(client: ClientRegisterDTO): Promise<Client> {
    const foundClient = await this.clientRepository.findOne({ email: client.email });
    if (foundClient) {
      throw new BadRequestException('Email already exist');
    }

    try {
      const manager = await this.usersRepository.findOne({ email: client.managerEmail });

      const funds = await this.fundsRepository.create();
      funds.currentamount = +client.amount;
      await this.fundsRepository.save(funds);

      const newClient = await this.clientRepository.create();
      newClient.firstName = client.firstName;
      newClient.lastName = client.lastName;
      newClient.address = client.address;
      newClient.age = client.age;
      newClient.email = client.email;
      newClient.dateregistered = new Date();
      newClient.manager = manager;
      newClient.funds = funds;

      return await this.clientRepository.save(newClient);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: any = await this.usersRepository.findOne({ where: { email: payload.email } });
    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<User> {
    const userFound: User = await this.usersRepository.findOne({ where: { email: user.email } });

    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);
      if (result) {
        return userFound;
      }
    }

    return null;
  }

  async getAllManagers() {
    const role = await this.roleRepository.findOne({rolename: 'manager'})
    return await this.usersRepository.find({role: role});
  }

  async getAllClients() {
    return this.clientRepository.find({});
  }

  async getClient(id: string): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({ id });
      return client;
    } catch (error) {
      throw new BadRequestException('No such client');
    }
  }

  async getManager(id: string): Promise<User> {
    try {
      const manager = await this.usersRepository.findOne({ id });
      return manager;
    } catch (error) {
      throw new BadRequestException('No such manager');
    }
  }
  async getManagerByClientId(clientId: string): Promise<User> {
    try {
      const client = await this.clientRepository.findOne({id: clientId})
      const manager = await this.usersRepository.findOne({id: client.manager.id}) // can be optimized
      return manager;
    } catch (error) {
      throw new BadRequestException('No such manager');
    }
  }

  async getClientsByManagerId(managerId: string): Promise<Client[]> {
    try {
      const manager = await this.usersRepository.findOne({id: managerId})
      const clients = await this.clientRepository.find({manager})
      return clients;
    } catch (error) {
      throw new BadRequestException('No such manager');
    }
  }

  async getClientsByManagerEmail(managerEmail: string): Promise<Client[]> {
    try {
      const manager = await this.usersRepository.findOne({email: managerEmail});
      const clients = await this.clientRepository.find({manager});
      return clients;
    } catch (error) {
      throw new BadRequestException('No such manager');
    }
  }
}
