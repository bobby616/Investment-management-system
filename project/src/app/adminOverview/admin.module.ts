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
import { AdminRearrangerComponent } from './rearranger/rearranger.component';
import { DragDropModule} from '@angular/cdk/drag-drop'
import { ClientService } from '../managerOverview/client/client.service';
@NgModule({
  declarations: [
    AddClientComponent,
    AddManagerComponent,
    AddAdminComponent,
    AdminRearrangerComponent
  ],
  imports: [
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [AdminService, ClientService]
})
export class AdminModule { }
