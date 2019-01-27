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
export class ManagerGuard implements CanActivate {

    constructor(
        public auth: AuthenticationService,
        public router: Router) {
    }

    canActivate(): boolean {


        if (Role.manager === this.auth.getRole()) {
            // this.router.navigate(['/']);
            return true;
        }

        // da se napravi 
        /* this.router.navigate(['unauthorised']);  */ 
        return false;
    }
}
