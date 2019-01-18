import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { TableListComponent } from '../components/table-list/table-list.component';
import { ClientListComponent } from './components/clinet-list.component.ts/client-list.component';
import { ClientComponent } from './components/client-component/client.component';
import { ClientService } from './client.service';

@NgModule({
    imports: [SharedModule, ClientRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ClientListComponent,
      ClientComponent,
      TableListComponent,
    ],
    providers: [ClientService]
  })
  export class ClientModule { }
  