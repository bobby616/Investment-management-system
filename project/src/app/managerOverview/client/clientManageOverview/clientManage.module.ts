import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../client.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientManageRoutingModule } from './clientManage-routing.module';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { StockComponent } from 'src/app/stock/component/stock.component';
import { StockModule } from 'src/app/stock/stock.module';
import { ClientPositionsComponent } from './client-positions/client-positions.component';


@NgModule({
    imports: [SharedModule, ClientManageRoutingModule, FormsModule, ReactiveFormsModule, StockModule],
    declarations: [
      ClientManageComponent,
      ClientPositionsComponent,
      
    ],
    providers: [ClientService]
  })
  export class ClientManageModule { }