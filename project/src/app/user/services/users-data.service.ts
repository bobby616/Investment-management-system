import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { RequesterService } from 'src/app/core/requester.service';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/common/app.config';

@Injectable()
export class UserDataService {
  public constructor(
    private readonly requester: RequesterService,
    private readonly app: AppConfig) { }

  public getAllUsers(): Observable<UserModel[]> {
    return this.requester.get(`${this.app.apiUrl}/users`);
  }
}
