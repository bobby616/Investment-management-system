import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientComponent } from './components/client-component/client.component';

const routes: Routes = [
    {
      path: '',
      component: ClientComponent
    },
    {
      path: ':id', loadChildren: './clientManageOverview/clientManage.module#ClientManageModule'
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
  export class ClientRoutingModule { }