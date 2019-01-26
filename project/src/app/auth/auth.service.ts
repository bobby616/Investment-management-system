import { StorageService } from '../core/storage.service';
import { Injectable } from '@angular/core';
import { RequesterService } from '../core/requester.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../user/models/user.model';
import { AppConfig } from '../common/app.config';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

@Injectable()
export class AuthService {
  // look up Persisting user authentication with BehaviorSubject in Angular
  // https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243

  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  public constructor(
    private readonly storageService: StorageService,
    private readonly requester: RequesterService,
    private readonly app: AppConfig,
    private toastr: ToastrService,
        private router: Router,
  ) { }

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public registerUser(user: UserModel): Observable<any> {
    return this.requester.post(
      `${this.app.apiUrl}/auth/register`,
      JSON.stringify(user)
    );
  }

  public loginUser(user: UserModel): Observable<any> {
    return this.requester
      .post(`${this.app.apiUrl}/auth/login`, JSON.stringify(user))
      .pipe(
        tap(response => {
          this.storageService.setItem('token', (<any>response).token);
          this.isLoggedInSubject$.next(true);
        })
      );
  }

  public logoutUser(): Observable<any> {
    return this.requester.post(`${this.app.apiUrl}/auth/logout`, null).pipe(
      tap(() => {
        this.storageService.removeItem('token');
        this.isLoggedInSubject$.next(false);
      })
    );
  }

  private hasToken(): boolean {
    return !!this.storageService.getItem('token');
  }

  public getRole(): string {
    const token = localStorage.getItem('token');
    const role = decode(token).role;

    return role;
  }

  public getEmail(): string {
    const token = localStorage.getItem('token');
    const email = decode(token).email;

    return email;
  }

  tokenData(): { id: number, role: string } {
    const token = localStorage.getItem('token');

    const tokenPayload = decode(token);

    return tokenPayload;
  }

  tokenEmail(): string {
    const token = localStorage.getItem('token');

    const tokenPayload = decode(token);

    return tokenPayload.email;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
