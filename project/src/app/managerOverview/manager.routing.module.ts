import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
    {
        path: '', component: SidebarComponent,
        children: [
            { path: 'clients', loadChildren: './client/client.module#ClientModule' },
            { path: 'stock', loadChildren: '../stock/stock.module#StockModule' },
        ]
    },
    {
        path: 'news', component: NewsComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
