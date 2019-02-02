import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/core/requester.service';
import { AppConfig } from 'src/app/common/app.config';
import { CompanyService } from 'src/app/user/services/company.service';
import { Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';
import { StockDTO } from 'src/app/models/stock.dto';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material';
import { StocksService } from '../stock.service';
import { FundsService } from '../funds.service';
import { OrdersService } from '../orders.service';
import { ModalDTO } from 'src/app/models/modal.model';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Client } from 'src/app/managerOverview/client/models/client.model';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/managerOverview/client/data.service';
import { StorageService } from 'src/app/core/storage.service';
import { ClientService } from 'src/app/managerOverview/client/client.service';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
    public gridOptions: GridOptions;
    client: Client | null;
    clientSubscription: Subscription;
    companySubcription: Subscription;

    private columnDefs = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, },
        { headerName: 'Market', field: 'market', sortable: true, },
        { headerName: 'Sell Price ($)', field: 'sellprice', sortable: true, filter: "agNumberColumnFilter" },
        { headerName: 'Buy Price ($)', field: 'buyprice', sortable: true, filter: "agNumberColumnFilter" }
    ];
    private defaultColDef = { width: 300, filter: true };
    private rowData = [];
    private rowSelection = 'single';

    constructor(
        private stockService: StocksService,
        public dialog: MatDialog,
        private notification: NotificatorService,
        private fundsService: FundsService,
        private orderService: OrdersService,
        private readonly dataService: DataService,
        private companyService: CompanyService,
        private router: Router
    ) { }
    ngOnInit() {
        this.clientSubscription = this.dataService.currentData.subscribe(client => {
            this.client = client;
        });
        // this.storageService.setItem('clientId', this.client.id);


        this.gridOptions = <GridOptions>{
            enableRangeSelection: true,
            columnDefs: this.columnDefs,
            onGridReady: () => {
                this.stockService.getCompanyLastPrices().subscribe((response: []) => {
                    response.forEach((stock: StockDTO) => {
                        const marketData: any = {};
                        marketData.symbol = stock.company.abbr;
                        marketData.market = stock.company.name;
                        marketData.sellprice = +stock.lowprice;
                        marketData.buyprice = +stock.highprice;
                        this.rowData.push(marketData);
                    });
                    if (this.gridOptions.api) {
                        this.gridOptions.api.setRowData(this.rowData);
                    }
                });
                this.gridOptions.rowHeight = 45;
            }
        };
    }
    onRowSelected(event) {
      console.log(event)
      if(this.client) {
        const instrument = `${event.data.symbol} (${event.data.market})`;
        const dialogRef = this.dialog.open(ModalComponent,
            {
                data: {
                    name: instrument,
                    buyprice: +event.data.buyprice,
                    sellprice: +event.data.sellprice
                }
            });

        dialogRef.afterClosed().subscribe((result: ModalDTO) => {
            if (result) {
                if (isNaN(result.total)) {
                    return this.notification.error('Invalid unit or price');
                }
                
                this.fundsService.substractFund(result);
                this.orderService.saveOrder(result, event.data.symbol);
            }
        });
      } 
      else {
          this.companySubcription = this.companyService.getCompanyByAbb(event.data.symbol).subscribe((data) => {
              console.log(event.data.symbol)
          this.companyService.changeId(data.id);
          this.router.navigate(['/manager/stock/chart'])
        })
      }
    }
    ngOnDestroy() {
        if(this.companySubcription) {
            this.companySubcription.unsubscribe()
        }
    }
}
