import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../core/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private readonly storageService: StorageService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedReq: HttpRequest<any> = req;

    return next.handle(modifiedReq);
  }
}
