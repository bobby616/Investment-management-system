import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientComponent } from './components/client-component/client.component';
import { ClientManageComponent } from './clientManageOverview/client-manage/client-manage.component';
import { ClientSidebarComponent } from './clientManageOverview/client-sidebar/client-sidebar.component';

const routes: Routes = [
    {
      path: '',
      component: ClientComponent
    },
    {
      path: ':id', loadChildren: './clientManageOverview/clientManage.module#ClientManageModule'
      /* children: [
        {
          path: '', component: ClientSidebarComponent,
        },
        {
          path: 'portfolio', component: ClientManageComponent,
        },
        {
          path: '**',
          redirectTo: '/not-found'
        },
      ] */
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