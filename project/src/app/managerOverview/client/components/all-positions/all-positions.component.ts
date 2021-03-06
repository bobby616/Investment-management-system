import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/stock/orders.service';
import { MatDialog } from '@angular/material';
import { OrdersHttpService } from 'src/app/stock/ordersRequest.service';
import { DataService } from '../../data.service';
import { StorageService } from 'src/app/core/storage.service';
import { GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Client } from '../../models/client.model';
import { OpenOrderDTO } from 'src/app/models/open-order.model';
import { ClientService } from '../../client.service';
import * as jwt_decode from 'jwt-decode';
import { ClientWithOrders } from 'src/app/models/clientWithOrders.model';


@Component({
  selector: 'app-all-positions',
  templateUrl: './all-positions.component.html',
  styleUrls: ['./all-positions.component.css']
})
export class AllPositionsComponent implements OnInit {
  public gridOptions: GridOptions;
  client: Client | undefined;
  clientSubscription: Subscription;
  private overlayNoRowsTemplate;
  private token: any;

  private columnDefs = [
    { headerName: 'FirstName', field: 'firstName', sortable: true, },
    { headerName: 'LastName', field: 'lastName', sortable: true, },
    { headerName: 'Company', field: 'name', sortable: true, },
    { headerName: 'Symbol', field: 'symbol', sortable: true, },
    { headerName: 'Units', field: 'units', sortable: true, },
    { headerName: 'Direction', field: 'direction', sortable: true, },
    { headerName: 'Open Price', field: 'price', sortable: true, },
    { headerName: 'Date', field: 'date', sortable: true, },
  ];

  private defaultColDef = { width: 300, filter: true };
  private rowData = [];
  private gridApi;
  private gridColumnApi;

  constructor(
    public dialog: MatDialog,
    private readonly clientService: ClientService,
  ) {
    this.overlayNoRowsTemplate = "<span>There are no active positions</span>";
  }


  ngOnInit() {
    this.token = jwt_decode(localStorage.getItem('token'));

    this.gridOptions = <GridOptions>{
      enableRangeSelection: true,
      columnDefs: this.columnDefs,

      onGridReady: () => {
        this.clientService.getClientsByManagerEmail(this.token.email).subscribe((response: []) => {
          response.forEach((client: ClientWithOrders) => {
            client.orders.forEach((order: OpenOrderDTO) => {
              const data: any = {};
              data.firstName = client.firstName;
              data.lastName = client.lastName;
              data.name = order.company.name;
              data.symbol = order.company.abbr;
              data.units = order.units;
              data.direction = order.direction;
              data.price = +order.openPrice;
              data.date = order.opendate;
              this.rowData.push(data);
            });
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
