import { NgModule } from '@angular/core';
import { ClientModule } from './client/client.module';
import { ManagerRoutingModule } from './manager.routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from './client/components/client-component/client.component';
import { ClientListComponent } from './client/components/clinet-list.component.ts/client-list.component';
import { FormsModule } from '@angular/forms';
import { ClientService } from './client/client.service';


@NgModule({
    declarations: [
    ],
    imports: [
        ManagerRoutingModule,
        SharedModule,
        FormsModule,
    ],
    providers: [ClientService]
})
export class ManagerModule { }
