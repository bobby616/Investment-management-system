import { Component, OnInit } from '@angular/core';
import { CloseOrderDTO } from 'src/app/models/close-order.model';
import { GridOptions } from 'ag-grid-community';
import { OrdersHttpService } from 'src/app/stock/ordersRequest.service';
import { ClientService } from '../../client.service';
import { StorageService } from 'src/app/core/storage.service';
import { OrdersService } from 'src/app/stock/orders.service';
import { FinishedOrderDTO } from 'src/app/models/finished-order.model';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.css']
})
export class ClientHistoryComponent implements OnInit {
  public gridOptions: GridOptions;
  private overlayNoRowsTemplate;
  clientId: string;

  private columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, },
    { headerName: 'Symbol', field: 'symbol', sortable: true, },
    { headerName: 'Units', field: 'units', sortable: true, },
    { headerName: 'Type', field: 'direction', sortable: true, },
    { headerName: 'Open price', field: 'price', sortable: true, },
    { headerName: 'Close Price', field: 'price', sortable: true, },
    { headerName: 'PRofit/loss', field: 'result', sortable: true, },
    { headerName: 'Close date', field: 'date', sortable: true, },
  ];
  private defaultColDef = { width: 200, filter: true };
  private rowData = [];
  private rowSelection = 'single';

  constructor(
    private orderService: OrdersService,
    private orderHTTPService: OrdersHttpService,
    private readonly clientService: ClientService,
    private localStorage: StorageService,
  ) {
    this.overlayNoRowsTemplate = "<span>There are no active positions for this client</span>";
  }


  ngOnInit() {
    this.clientId = this.localStorage.getItem('clientId');
      this.gridOptions = <GridOptions>{
        enableRangeSelection: true,
        columnDefs: this.columnDefs,
        onGridReady: () => {
          this.orderHTTPService.getClosedOrdersByClientId(this.clientId).subscribe((content: []) => {
            content.forEach((order: FinishedOrderDTO) => {
              console.log(order);
              const data: any = {};
              data.name = order.company.name;
              data.symbol = order.company.abbr;
              data.units = order.units;
              data.direction = order.direction;
              data.price = +order.openPrice;
              data.closePrice = +order.closePrice;
              data.result = +order.result;
              data.date = order.closedate;
              this.rowData.push(data);
            });
            if (this.gridOptions.api) {
              this.gridOptions.api.setRowData(this.rowData);
            }
          });
          this.gridOptions.rowHeight = 45;
        }
      };
  }
}
