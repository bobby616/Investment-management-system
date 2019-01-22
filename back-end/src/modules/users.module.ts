import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '../data/entities/user.entity';
import { UsersController } from '../controllers/users.controller';
import { ClientsController } from 'src/controllers/clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CoreModule, AuthModule],
  providers: [],
  exports: [],
  controllers: [UsersController, ClientsController],
})
export class UsersModule {}
