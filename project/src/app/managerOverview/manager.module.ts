import { NewsComponent } from './news/news.component';
import { NgModule } from '@angular/core';
import { ManagerRoutingModule } from './manager.routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ClientService } from './client/client.service';


@NgModule({
    declarations: [
        NewsComponent
    ],
    imports: [
        ManagerRoutingModule,
        SharedModule,
        FormsModule,
    ],
    providers: [ClientService]
})
export class ManagerModule { }
