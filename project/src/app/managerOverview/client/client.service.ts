import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Client } from './models/client.model';
import { tap, catchError } from 'rxjs/operators';
import { AppConfig } from 'src/app/common/app.config';

@Injectable()

export class ClientService {


    constructor(private readonly http: HttpClient,
        private readonly app: AppConfig, ) { }

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.app.apiUrl}/users/clients`);
    }

    getClient(id: string): Observable<Client> {
        return this.http.get<Client>(`${this.app.apiUrl}/users/getClient/${id}`);
    }

    getClientsByManagerEmail(managerEmail: string): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.app.apiUrl}/users/getClientsByManagerEmail/${managerEmail}`);
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}