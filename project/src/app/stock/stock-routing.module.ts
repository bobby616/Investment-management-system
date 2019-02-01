import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthRouteActivatorService } from '../core/route-guards/auth-route-activator.service';
import { AnonymousRouteActivatorService } from '../core/route-guards/anonymous-route-activator.service';
import { StockComponent } from './component/stock.component';
import { ChartComponent } from '../managerOverview/chart-component/chart.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/manager/stock/all',
        pathMatch: 'full'
    },
    {
        path: 'all',
        component: StockComponent
    },
    {
        path: 'chart',
        component: ChartComponent
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
