import { NewsComponent } from './news/news.component';
import { NgModule } from '@angular/core';
import { ManagerRoutingModule } from './manager.routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ClientService } from './client/client.service';
import { AllPositionsComponent } from './client/components/all-positions/all-positions.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
    declarations: [
        AllPositionsComponent,
        NewsComponent
    ],
    imports: [
        ManagerRoutingModule,
        SharedModule,
        FormsModule,
        AgGridModule.withComponents([AllPositionsComponent]),
    ],
    providers: [ClientService],
    exports: [AllPositionsComponent]
})
export class ManagerModule { }
