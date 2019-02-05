import { ClientService } from 'src/app/managerOverview/client/client.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from '../../models/client.model';
import { DataService } from '../../data.service';
import { GridOptions } from 'ag-grid-community';
import { OpenOrderDTO } from 'src/app/models/open-order.model';
import { OrdersHttpService } from 'src/app/stock/ordersHTTP.service';
import { StorageService } from 'src/app/core/storage.service';
import { MatDialog } from '@angular/material';
import { CloseOrderModalComponent } from './client-positions-modal/close-order-modal.component';
import { CloseOrderDTO } from 'src/app/models/close-order.model';
import { OrdersService } from 'src/app/stock/orders.service';

@Component({
  selector: 'app-client-positions',
  templateUrl: './client-positions.component.html',
  styleUrls: ['./client-positions.component.css']
})
export class ClientPositionsComponent implements OnInit {
  public gridOptions: GridOptions;
  client: Client | undefined;
  clientSubscription: Subscription;
  private overlayNoRowsTemplate;
  clientId: string;

  private columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, },
    { headerName: 'Symbol', field: 'symbol', sortable: true, },
    { headerName: 'Units', field: 'units', sortable: true, },
    { headerName: 'Direction', field: 'direction', sortable: true, },
    { headerName: 'Open Price', field: 'price', sortable: true, },
    { headerName: 'Date', field: 'date', sortable: true, },
  ];
  private defaultColDef = { width: 300, filter: true };
  private rowData = [];
  private rowSelection = 'single';

  constructor(
    public dialog: MatDialog,
    private orderService: OrdersService,
    private orderHTTPService: OrdersHttpService,
    private readonly clientService: ClientService,
    private localStorage: StorageService,
  ) {
    this.overlayNoRowsTemplate = "<span>There are no active positions for this client</span>";
  }


  ngOnInit() {
    this.clientId = this.localStorage.getItem('id')
    this.clientSubscription = this.clientService.getClient(this.localStorage.getItem('id')).subscribe((client) => {
      this.client = client
    })
      this.gridOptions = <GridOptions>{
        enableRangeSelection: true,
        columnDefs: this.columnDefs,
        onGridReady: () => {
          this.orderHTTPService.getOrdersByClientId(this.clientId).subscribe((response: []) => {
            response.forEach((order: OpenOrderDTO) => {
              const data: any = {};
              data.symbol = order.company.abbr;
              data.units = order.units;
              data.direction = order.direction;
              data.price = +order.openPrice;
              data.date = order.opendate;
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
  onRowSelected(event) {
    const instrument = `${event.data.name}`;
    const dialogRef = this.dialog.open(CloseOrderModalComponent,
      {
        data: {
          name: instrument,
          openPrice: +event.data.price,
        }
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const closeOrder: CloseOrderDTO = {
          price: event.data.price,
          units: event.data.units,
          direction: event.data.direction,
          companyId: '',
          closePrice: '',
        };
        this.orderService.closeOrder(closeOrder, event.data.symbol);
      }
    });
  }

}
