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
        private auth: AuthenticationService,
        private router: Router) {
    }

    canActivate(): boolean {
        if (Role.manager === this.auth.getRole()) {
            return true;
        }
        return false;
    }
}
