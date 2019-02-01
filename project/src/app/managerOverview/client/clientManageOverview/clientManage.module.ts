import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../client.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientManageRoutingModule } from './clientManage-routing.module';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { ClientPositionsComponent } from './client-positions/client-positions.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [SharedModule, ClientManageRoutingModule, FormsModule, ReactiveFormsModule, MatTableModule],
    declarations: [
      ClientManageComponent,
      ClientPositionsComponent
    ],
    providers: [ClientService]
  })
  export class ClientManageModule { }