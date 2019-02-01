import { ClientRoutingModule } from './client-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClientListComponent } from './components/clinet-list.component.ts/client-list.component';
import { ClientComponent } from './components/client-component/client.component';
import { ClientService } from './client.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [SharedModule, ClientRoutingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      ClientListComponent,
      ClientComponent,
    ],
    providers: [ClientService]
  })
  export class ClientModule { }
  