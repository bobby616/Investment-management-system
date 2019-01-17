import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { ClientComponent } from './component/client.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TableListComponent } from '../components/table-list/table-list.component';

@NgModule({
    imports: [SharedModule, ClientRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ClientComponent,
      TableListComponent,
    ],
    providers: []
  })
  export class ClientModule { }
  