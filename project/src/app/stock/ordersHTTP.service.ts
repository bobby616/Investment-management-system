import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../common/app.config';
import { Observable } from 'rxjs';
import { CreateOrderDTO } from '../models/create-order.model';

@Injectable()
export class OrdersHttpService {
    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    public createOrder(orderInfo: CreateOrderDTO): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/orders/create`, orderInfo);
    }
}
