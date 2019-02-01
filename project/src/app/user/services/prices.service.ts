import { AppConfig } from 'src/app/common/app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from '../models/price.model';

@Injectable()

export class PriceService {


    constructor(private readonly http: HttpClient,
        private readonly app: AppConfig, ) { }

    getPrice(id: string): Observable<Price[]> {
        return this.http.get<Price[]>(`${this.app.apiUrl}/prices/chart/${id}`);
    }
}