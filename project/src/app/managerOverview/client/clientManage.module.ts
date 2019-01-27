import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientManageComponent } from './components/client-manage/client-manage.component';
import { ClientService } from './client.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [SharedModule, ClientRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      
    ],
    providers: [ClientService]
  })
  export class ClientManageModule { }