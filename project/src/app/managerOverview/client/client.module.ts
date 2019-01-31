import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClientListComponent } from './components/clinet-list.component.ts/client-list.component';
import { ClientComponent } from './components/client-component/client.component';
import { ClientService } from './client.service';
import { TableListComponent } from 'src/app/components/table-list/table-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientManageComponent } from './clientManageOverview/client-manage/client-manage.component';
import { ClientManageModule } from './clientManageOverview/clientManage.module';

@NgModule({
    imports: [SharedModule, ClientRoutingModule, ClientManageModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ClientListComponent,
      ClientComponent,
      TableListComponent,
    ],
    providers: [ClientService]
  })
  export class ClientModule { }
  