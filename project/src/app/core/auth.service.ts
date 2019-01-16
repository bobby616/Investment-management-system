import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { RequesterService } from './requester.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../user/models/user.model';

@Injectable()
export class AuthService {
  // look up Persisting user authentication with BehaviorSubject in Angular
  // https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243

  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  public constructor(
    private readonly storageService: StorageService,
    private readonly requester: RequesterService
  ) {}

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public registerUser(user: UserModel): Observable<any> {
    return this.requester.post(
      'http://localhost:5000/auth/register',
      JSON.stringify(user)
    );
  }

  public loginUser(user: UserModel): Observable<any> {
    return this.requester
      .post('http://localhost:5000/auth/login', JSON.stringify(user))
      .pipe(
        tap(response => {
          this.storageService.setItem('token', (<any>response).token);
          this.isLoggedInSubject$.next(true);
        })
      );
  }

  public logoutUser(): Observable<any> {
    return this.requester.post('http://localhost:5000/auth/logout', null).pipe(
      tap(() => {
        this.storageService.removeItem('token');
        this.isLoggedInSubject$.next(false);
      })
    );
  }

  private hasToken(): boolean {
    return !!this.storageService.getItem('token');
  }
}
