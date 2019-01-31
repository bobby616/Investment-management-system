import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './component/stock.component';
import { AgGridModule } from 'ag-grid-angular';
import { StocksService } from './stock.service';
import { FundsService } from './funds.service';
import { FundsHttpService } from './fundsHTTP.service';
import { OrdersHttpService } from './ordersHTTP.service';
import { OrdersService } from './orders.service';
import { ClientService } from '../managerOverview/client/client.service';
import { ModalComponent } from '../shared/modal/modal.component';

@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    SharedModule, StockRoutingModule, FormsModule, ReactiveFormsModule,
    AgGridModule.withComponents([StockComponent])
  ],
  providers: [StocksService, FundsService, FundsHttpService, OrdersHttpService, OrdersService, ClientService],
  entryComponents: [
    ModalComponent
  ],
  bootstrap: [ModalComponent]
})
export class StockModule { }
