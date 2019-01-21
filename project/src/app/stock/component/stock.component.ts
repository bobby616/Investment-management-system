import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/core/requester.service';
import { AppConfig } from 'src/app/common/app.config';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  title = 'app';

  columnDefs = [
      {headerName: 'id', field: 'id', sortable: true, filter: true},
      {headerName: 'Name', field: 'name', sortable: true, filter: true},
      {headerName: 'Abbriviature', field: 'abbr', sortable: true, filter: true },
      {headerName: 'Icon', field: 'icon', sortable: true, filter: true },
      {headerName: 'CEO', field: 'ceo', sortable: true, filter: true },
      {headerName: 'аddress', field: 'address', sortable: true, filter: true }
  ];

  rowData: any;

  constructor(private request: RequesterService,
    private readonly app: AppConfig) {

  }

  ngOnInit() {
      this.rowData = this.request.get(`${this.app.apiUrl}/stocks/all`);
      console.log(this.rowData);
  }
}
