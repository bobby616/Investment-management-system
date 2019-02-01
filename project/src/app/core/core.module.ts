import { AnonymousRouteActivatorService } from './route-guards/anonymous-route-activator.service';
import { AuthRouteActivatorService } from './route-guards/auth-route-activator.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RequesterService } from './requester.service';
import { StorageService } from './storage.service';
import { NotificatorService } from './notificator.service';
import { AuthService } from '../auth/auth.service';
import { SearchService } from './search.service';
import { AppConfig } from '../common/app.config';
import { DataService } from '../managerOverview/client/data.service';
import { PriceService } from '../user/services/prices.service';
import { CompanyService } from '../user/services/company.service';

@NgModule({
  providers: [
    AppConfig,
    RequesterService,
    StorageService,
    NotificatorService,
    AuthService,
    SearchService,
    AuthRouteActivatorService,
    AnonymousRouteActivatorService,
    DataService,
    PriceService,
    CompanyService
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
