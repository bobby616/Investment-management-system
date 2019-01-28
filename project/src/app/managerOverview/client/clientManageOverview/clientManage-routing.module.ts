import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { ClientSidebarComponent } from './client-sidebar/client-sidebar.component';

const routes: Routes = [
    {
      path: '', component: ClientManageComponent,
    },
    /* {
      path: 'portfolio', component: ClientManageComponent,
    }, */
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