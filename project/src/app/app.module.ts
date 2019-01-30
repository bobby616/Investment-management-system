import { SpinnerInterceptor } from './interceptors/spinner-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServerErrorComponent } from './components/server-error/server-errror.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerErrorInterceptor } from './interceptors/server-error-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from "ag-grid-angular/main";
import { StockModule } from './stock/stock.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuard } from './core/admin-guard';
import { ManagerGuard } from './core/manager-guard';
import { RoleGuard } from './core/route-guards/route-guard.service';
import { MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ServerErrorComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    NgxSpinnerModule,
    StockModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    AdminGuard,
    ManagerGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
