import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../common/app.config';
import { Observable } from 'rxjs';
import { CreateOrderDTO } from '../models/create-order.model';
import { OpenOrderDTO } from '../models/open-order.model';
import { CloseOrderDTO } from '../models/close-order.model';
import { FinishedOrderDTO } from '../models/finished-order.model';

@Injectable()
export class OrdersHttpService {
    constructor(
        private readonly http: HttpClient,
        private readonly app: AppConfig,
    ) { }

    public createOrder(order: CreateOrderDTO): Observable<object> {
        return this.http.post(`${this.app.apiUrl}/orders/create`, order);
    }

    public getOrdersByClientId(clientId: string): Observable<OpenOrderDTO[]> {
        return this.http.get<OpenOrderDTO[]>(`${this.app.apiUrl}/orders/getOpen/${clientId}`);
    }

    public getClosedOrdersByClientId(clientId: string): Observable<FinishedOrderDTO[]> {
        return this.http.get<FinishedOrderDTO[]>(`${this.app.apiUrl}/orders/getClosed/${clientId}`);
    }

    public closeOrder(orderCloseInfo: CloseOrderDTO): Observable<object>{
        return this.http.post(`${this.app.apiUrl}/orders/close`, orderCloseInfo);
    }
}
