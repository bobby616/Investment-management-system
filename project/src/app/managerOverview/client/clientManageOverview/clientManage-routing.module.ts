import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { StockComponent } from 'src/app/stock/component/stock.component';
import { ClientPositionsComponent } from './client-positions/client-positions.component';
import { ClientHistoryComponent } from './client-history/client-history.component';

const routes: Routes = [
    {
      path: '', component: ClientManageComponent,
    },
    {
      path: 'stock', component: StockComponent,
    },
    {
      path: 'positions', component: ClientPositionsComponent,
    },
    {
      path: 'history', component: ClientHistoryComponent,
    },
    {
      path: '**',
      redirectTo: '/not-found'
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientManageRoutingModule { }