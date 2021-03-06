import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../client.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientManageRoutingModule } from './clientManage-routing.module';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { StockComponent } from 'src/app/stock/component/stock.component';
import { StockModule } from 'src/app/stock/stock.module';
import { ClientPositionsComponent } from './client-positions/client-positions.component';
import { CloseOrderModalComponent } from './client-positions/client-positions-modal/close-order-modal.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatSelectModule, MatDialogModule, MatInputModule, MatTableModule } from '@angular/material';
import { StocksService } from 'src/app/stock/stock.service';
import { FundsService } from 'src/app/stock/funds.service';
import { OrdersService } from 'src/app/stock/orders.service';
import { ClientHistoryComponent } from './client-history/client-history.component';
import { FundsHttpService } from 'src/app/stock/fundsReques.service';
import { OrdersHttpService } from 'src/app/stock/ordersRequest.service';


@NgModule({
  imports: [SharedModule,
    ClientManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StockModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    AgGridModule.withComponents([ClientPositionsComponent])],
  declarations: [
    ClientManageComponent,
    ClientPositionsComponent,
    CloseOrderModalComponent,
    ClientHistoryComponent,
  ],
  providers: [ClientService ,StocksService, FundsService, FundsHttpService,
    OrdersHttpService, OrdersService, ClientService],
  entryComponents: [
    CloseOrderModalComponent
  ],
})
export class ClientManageModule { }
