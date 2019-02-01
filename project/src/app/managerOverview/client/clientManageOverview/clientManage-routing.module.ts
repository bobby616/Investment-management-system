import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { ClientPositionsComponent } from './client-positions/client-positions.component';

const routes: Routes = [
    {
      path: '', component: ClientManageComponent,
    },
    {
      path: 'positions', component: ClientPositionsComponent,
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