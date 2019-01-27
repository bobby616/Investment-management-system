import { NgModule } from '@angular/core';
import { ClientRoutingModule } from '../client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../client.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientManageRoutingModule } from './clientManage-routing.module';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { ClientSidebarComponent } from './client-sidebar/client-sidebar.component';


@NgModule({
    imports: [SharedModule, ClientManageRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ClientManageComponent,
      ClientSidebarComponent
    ],
    providers: [ClientService]
  })
  export class ClientManageModule { }