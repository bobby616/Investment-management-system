import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot
} from '@angular/router';
import { debug } from 'util';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from './auth.service';
import { Role } from '../models/roles';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        public auth: AuthenticationService,
        public router: Router) {
    }

    canActivate(): boolean {


        if (Role.admin === this.auth.getRole()) {
            return true;
        }

        // da se napraiii, mitko mamka mu stara deba
        /* this.router.navigate(['unauthorised']); */
        return false;
    }
}
