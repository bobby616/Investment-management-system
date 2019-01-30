
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'clients', loadChildren: './client/client.module#ClientModule' },
            { path: 'stock', loadChildren: '../stock/stock.module#StockModule' },]
    },


    /* {
        path: 'client/:clientId', component: ManageClientComponent, children: [
            { path: '', redirectTo: 'portfolio' },
            {
                path: 'portfolio', component: ClientPortfolioComponent,
                data: { animation: { value: 'manager' } }
            },
            {
                path: 'positions', component: ClientPositionsComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'market', component: ClientMarketComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'watchlist', component: ClientWatchlistComponent,
                data: { animation: { value: 'manager' } },
            },
            {
                path: 'history', component: ClientHistoryComponent,
                data: { animation: { value: 'manager' } },
            },
        ]
    } */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
