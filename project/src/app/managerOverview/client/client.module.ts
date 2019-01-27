import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClientListComponent } from './components/clinet-list.component.ts/client-list.component';
import { ClientComponent } from './components/client-component/client.component';
import { ClientService } from './client.service';
import { ClientManageComponent } from './components/client-manage/client-manage.component';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from 'src/app/components/home/home.component';

@NgModule({
    imports: [SharedModule, ClientRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ClientListComponent,
      ClientComponent,
      TableListComponent,
      ClientManageComponent
    ],
    providers: [ClientService]
  })
  export class ClientModule { }
  