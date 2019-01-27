import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from './admin.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AddClientComponent,
    AddManagerComponent,
    AddAdminComponent
  ],
  imports: [
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [AdminService]
})
export class AdminModule { }
