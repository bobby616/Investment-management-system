import { Component, OnInit } from '@angular/core';
import { NotificatorService } from 'src/app/core/notificator.service';
import { StockDTO } from 'src/app/models/stock.dto';
import { GridOptions } from 'ag-grid-community';
import { MatDialog } from '@angular/material';
import { StocksService } from '../stock.service';
import { FundsService } from '../funds.service';
import { OrdersService } from '../orders.service';
import { ModalDTO } from 'src/app/models/modal.model';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
    public gridOptions: GridOptions;
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
    ) { }
    ngOnInit() {
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
}
