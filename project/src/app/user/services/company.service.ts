import { AppConfig } from 'src/app/common/app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { Price } from '../models/price.model';
import { Company } from '../models/company.model';

@Injectable()

export class CompanyService {
    private id = new BehaviorSubject<string>('0d7fc154-7968-4a04-8e59-bf2f5d8b86ab');
    currentData = this.id.asObservable();

    changeId(id: string) {
        console.log(id)
        this.id.next(id)
    }


    constructor(private readonly http: HttpClient,
        private readonly app: AppConfig, ) { }

    getCompany(id: string): Observable<Company> {
        return this.http.get<Company>(`${this.app.apiUrl}/stocks/company/${id}`);
    }

    getCompanyByAbb(abb: string): Observable<Company> {
        return this.http.get<Company>(`${this.app.apiUrl}/company/${abb}`)
    }
}