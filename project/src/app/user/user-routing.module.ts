import { RegisterComponent } from './register/register.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthRouteActivatorService } from '../core/route-guards/auth-route-activator.service';
import { AnonymousRouteActivatorService } from '../core/route-guards/anonymous-route-activator.service';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/users/all', pathMatch: 'full' },
  {
    path: 'all',
    component: UsersListComponent,
    canActivate: [AuthRouteActivatorService]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousRouteActivatorService]
  },
  {
    path: '',
    redirectTo: '/not-found'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
