
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

const routes: Routes = [
    {
        path: '', component: SidebarComponent,
        children: [
            { path: 'clients', loadChildren: './client/client.module#ClientModule' },
            { path: 'stock', loadChildren: '../stock/stock.module#StockModule' },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
