import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerErrorComponent } from './components/server-error/server-errror.component';
import { LoginComponent } from './user/login/login.component';
/* import { IconSvgExample } from './components/icons/icons.component'; */

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'users', loadChildren: './user/user.module#UserModule' },
  { path: 'client', loadChildren: './client/client.module#ClientModule' },
  { path: 'stock', loadChildren: './stock/stock.module#StockModule' },
  /* { path: 'test', component: IconSvgExample }, */
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
