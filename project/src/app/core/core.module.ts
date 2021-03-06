import { AnonymousRouteActivatorService } from './route-guards/anonymous-route-activator.service';
import { AuthRouteActivatorService } from './route-guards/auth-route-activator.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RequesterService } from './requester.service';
import { StorageService } from './storage.service';
import { NotificatorService } from './notificator.service';
import { AuthService } from '../auth/auth.service';
import { AppConfig } from '../common/app.config';
import { DataService } from '../managerOverview/client/data.service';
import { PriceService } from '../user/services/prices.service';
import { CompanyService } from '../user/services/company.service';
import { NewsService } from '../stock/news.service';

@NgModule({
  providers: [
    AppConfig,
    RequesterService,
    StorageService,
    NotificatorService,
    AuthService,
    AuthRouteActivatorService,
    AnonymousRouteActivatorService,
    DataService,
    PriceService,
    CompanyService,
    NewsService
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
