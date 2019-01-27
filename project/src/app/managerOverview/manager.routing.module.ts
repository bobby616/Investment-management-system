
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ClientManageComponent } from './client/components/client-manage/client-manage.component';
import { ClientListComponent } from './client/components/clinet-list.component.ts/client-list.component';
import { Client } from './client/models/client.model';
import { ClientComponent } from './client/components/client-component/client.component';

const routes: Routes = [
    {
/*          path: '', component: HomeComponent, children: [ */
            path: '', component: HomeComponent,

            /* loadChildren: './client/client.module#ClientModule' , */
            /* {
                path: 'market', component: MarketComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'positions', component: PositionsComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'clients', component: ClientsComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'market/company/:id', component: CompanyPortfolioComponent,
                data: { animation: { value: 'manager' } },
            }, */
    },
    {path: 'clients', loadChildren: './client/client.module#ClientModule'},
    {path: 'stock', loadChildren: '../stock/stock.module#StockModule'},
    // {path: 'watchlist', },
    // {path: 'history', },
    /* {
        path: 'client/:clientId', component: ClientManageComponent, children: [
            { path: '', redirectTo: 'portfolio' },
        ]
    } */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
