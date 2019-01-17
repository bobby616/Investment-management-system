import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthRouteActivatorService } from '../core/route-guards/auth-route-activator.service';
import { AnonymousRouteActivatorService } from '../core/route-guards/anonymous-route-activator.service';
import { StockComponent } from './component/stock.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/stock/all',
        pathMatch: 'full'
    },
    {
        path: 'all',
        component: StockComponent
    },
    {
        path: '**',
        redirectTo: '/not-found'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule { }
