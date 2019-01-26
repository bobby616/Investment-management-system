import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientComponent } from './components/client-component/client.component';
import { ClientManageComponent } from './components/client-manage/client-manage.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ClientListComponent } from './components/clinet-list.component.ts/client-list.component';

const routes: Routes = [
    {
      path: '',
      component: ClientListComponent
    },
    {
      path: ':id', component: ClientManageComponent
      /* loadChildren: './clientManage.module#ClientManageModule' */
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