import { NotFoundComponent } from './components/not-found/not-found.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerErrorComponent } from './components/server-error/server-errror.component';
import { AdminGuard } from './core/admin-guard';
import { ManagerGuard } from './core/manager-guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'  
  },
  {
    path: 'admin', loadChildren: './adminOverview/admin.module#AdminModule',
    canActivate: [AdminGuard],
  },
  {
    path: 'manager', 
    loadChildren: './managerOverview/manager.module#ManagerModule',
    canActivate: [ManagerGuard],
  },

  { path: 'login', component: LoginComponent }, 

  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },

  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules , onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
