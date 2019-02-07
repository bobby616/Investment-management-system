
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from '../common/app.config';
import { AddSubstractDTO } from '../models/add-substract.motel';

@Injectable()
export class FundsHttpService {
    constructor(
        private readonly http: HttpClient,
        private readonly appConfig: AppConfig,
    ) { }

    public substractFund(clientCred: AddSubstractDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/funds/substract`, clientCred);
    }

    public addFund(clientCred: AddSubstractDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/funds/add`, clientCred);
    }

    public getFund(clientId: string): Observable<object> {
        return this.http.get(`${this.appConfig.apiUrl}/funds/client/${clientId}`);
    }
}
