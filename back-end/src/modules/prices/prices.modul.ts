import { Module } from '@nestjs/common';
import { CoreModule } from 'src/common/core/core.module';
import { AuthModule } from 'src/auth/auth.module';
import { PricesController } from './prices.controler';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [PricesController],
  providers: [PricesController],
})
export class PricesModule {}
