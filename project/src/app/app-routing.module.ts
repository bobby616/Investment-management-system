import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerErrorComponent } from './components/server-error/server-errror.component';
import { RoleGuard } from './core/route-guards/route-guard.service';
import { AdminGuard } from './core/admin-guard';
import { ManagerGuard } from './core/manager-guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent, /* canActivate: [RoleGuard], */
  },
 /* {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AdminGuard],
    './manager/manager.module#ManagerModule'
    }, */
{
    path: 'manager', /* component: HomeComponent, */
    loadChildren: './managerOverview/manager.module#ManagerModule',
    canActivate: [ManagerGuard],
},


  /* { path: '', redirectTo: '/login', pathMatch: 'full'}, */
  /* { path: 'home', component: HomeComponent}, */


  /* { path: 'login', component: LoginComponent },
  { path: 'users', loadChildren: './user/user.module#UserModule' },
  { path: 'clients', loadChildren: './client/client.module#ClientModule' },
  { path: 'stock', loadChildren: './stock/stock.module#StockModule' }, */

  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },

  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
