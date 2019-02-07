import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsService {
    constructor(
        private readonly http: HttpClient,
    ) { }

    public getNews(): Observable<object> {
        return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=40c2bf7fbe70406b896163e20ddf3865');
    }
}