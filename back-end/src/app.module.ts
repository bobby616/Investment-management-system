import { ConfigService } from './config/config.service';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './common/core/core.module';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './common/core/services/users.service';
import { IndustryModule } from './modules/industry/industry.modul';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { PricesModule } from './modules/prices/prices.modul';
import { UsersModule } from './modules/users.module';
import { StocksController } from './controllers/stocks.controller';
import { FundsController } from './controllers/funds.controller';
import { OrdersController } from './controllers/orders.controller';
import { IndustryController } from './controllers/industry.controller';
import { PricesController } from './controllers/prices.controller';
@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
    CoreModule,
    DatabaseModule,
    IndustryModule,
    WatchlistModule,
    PricesModule,
    UsersModule,
  ],
  controllers: [PricesController, StocksController, FundsController, OrdersController, IndustryController],
  providers: [UsersService],
})
export class AppModule { }
