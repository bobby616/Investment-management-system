import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../common/app.config';
import { StockDTO } from '../models/stock.dto';

@Injectable()
export class StocksService {
    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
    ) { }

    public getStocks(): Observable<object> {
        return this.http.get(`${this.appConfig.apiUrl}/stocks/all`);
    }
    public getCompanyLastPrices(): Observable<object> {
        return this.http.get(`${this.appConfig.apiUrl}/prices/lastPrices`);
    }
    public getLastPricesForOneCompany(id: string): Observable<object> {
        return this.http.get(`${this.appConfig.apiUrl}/prices/lastPrice/${id}`);
    }
    public getCompanyByAbbr(companyAbbr): Observable<object> {
        return this.http.post(`${this.appConfig.apiUrl}/stocks/abbreviature`, companyAbbr);
    }

    getStockData(): any[] {
        const stocksData = [];
        let marketData = [];
        this.getCompanyLastPrices().subscribe((response: []) => {
            response.forEach((stock: StockDTO) => {
                marketData.push(stock.company.abbr, +stock.lowprice, +stock.highprice,
                    stock.company.industry.name, stock.company.name);

                stocksData.push(marketData);
                marketData = [];
            });
        });
        return stocksData;
    }
}