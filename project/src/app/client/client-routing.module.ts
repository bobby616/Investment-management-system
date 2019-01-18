import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { ClientComponent } from './components/client-component/client.component';

const routes: Routes = [
    { path: '', redirectTo: '/users/all', pathMatch: 'full' },
    {
      path: 'all',
      component: ClientComponent
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