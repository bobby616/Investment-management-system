import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminRearrangerComponent } from './rearranger/rearranger.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

const routes: Routes = [
  {path: '', component: SidebarComponent, 
  children: [
    {path: 'clients', component: AddClientComponent},
    {path: 'managers', component: AddManagerComponent},
    {path: 'admins', component: AddAdminComponent},
    {path: 'rearrange', component: AdminRearrangerComponent},]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
