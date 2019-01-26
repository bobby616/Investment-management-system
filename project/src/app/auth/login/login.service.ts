
import { AppConfig } from 'src/app/common/app.config';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/user/models/user.model';
import { HttpOptions } from 'src/app/models/http-options.model';
import { RequesterService } from 'src/app/core/requester.service';
import { Injectable } from '@angular/core';


@Injectable()
export class LoginService {


    constructor(
        private appConfig: AppConfig,
        private requester: RequesterService
    ) { }

    public login(user: UserModel, options?: HttpOptions): Observable<Object> {
        return this.requester.post(`${this.appConfig.apiUrl}/auth/login`, user);
    }

}
