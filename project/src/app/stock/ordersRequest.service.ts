import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../common/app.config';
import { Observable } from 'rxjs';
import { CreateOrderDTO } from '../models/create-order.model';
import { OpenOrderDTO } from '../models/open-order.model';
import { CloseOrderDTO } from '../models/close-order.model';

@Injectable()
export class OrdersHttpService {
    constructor(
        private http: HttpClient,
        private app: AppConfig,
    ) { }

    public createOrder(orderInfo: CreateOrderDTO): Observable<object> {
        return this.http.post(`${this.app.apiUrl}/orders/create`, orderInfo);
    }

    public getOrdersByClientId(clientId: string): Observable<OpenOrderDTO[]> {
        return this.http.get<OpenOrderDTO[]>(`${this.app.apiUrl}/orders/getOpen/${clientId}`);
    }

    public closeOrder(orderCloseInfo: CloseOrderDTO): Observable<object>{
        return this.http.post(`${this.app.apiUrl}/orders/close`, orderCloseInfo);
    }
}
