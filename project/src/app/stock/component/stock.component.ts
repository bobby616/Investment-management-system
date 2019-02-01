import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/core/requester.service';
import { AppConfig } from 'src/app/common/app.config';
import { CompanyService } from 'src/app/user/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  title = 'app';

  public columnDefs = [
      {headerName: 'id', field: 'id', sortable: true, filter: true, onCellClicked: (event) => {
        this.companyService.changeId(event.value);
        this.router.navigate(['/manager/stock/chart'])
      }},
      {headerName: 'Name', field: 'name', sortable: true, filter: true},
      {headerName: 'Abbriviature', field: 'abbr', sortable: true, filter: true },
      {headerName: 'Icon', field: 'icon', sortable: true, filter: true },
      {headerName: 'CEO', field: 'ceo', sortable: true, filter: true },
      {headerName: 'аddress', field: 'address', sortable: true, filter: true }
  ];

  rowData: any;

  constructor(private request: RequesterService,
    private readonly app: AppConfig,
    private readonly companyService: CompanyService,
    private readonly router: Router) {

  }
  ngOnInit() {
      this.rowData = this.request.get(`${this.app.apiUrl}/stocks/all`);
      console.log(this.rowData);
  }
}
