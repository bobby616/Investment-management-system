import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientManageComponent } from './components/client-manage/client-manage.component';
import { ClientService } from './client.service';


@NgModule({
    imports: [SharedModule, ClientRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ClientManageComponent,
    ],
    providers: [ClientService]
  })
  export class ClientManageModule { }