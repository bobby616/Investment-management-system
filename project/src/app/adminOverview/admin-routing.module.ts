import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

const routes: Routes = [
  {path: '', component: AdminHomeComponent},
  {path: 'clients', component: AddClientComponent},
  {path: 'managers', component: AddManagerComponent},
  {path: 'admins', component: AddAdminComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
