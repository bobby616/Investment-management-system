import { LoginComponent } from './../../auth/login/login.component';
import { NewsService } from './../../stock/news.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { NewsDTO } from 'src/app/models/news.model';

@Component({
    selector: "app-news",
    templateUrl: "./news.component.html",
    styleUrls: ["./news.component.css"]
  })
  export class NewsComponent {
      news: any[];
      filteredNews: any
      random = Math.floor(Math.random() * 19) + 1  
    constructor(private readonly newsService: NewsService){}
    ngOnInit() {
       this.newsService.getNews().subscribe((data: NewsDTO) => {
           this.news = data.articles;
           this.filteredNews = []
           this.filteredNews.push(this.news[this.random])
       })
    }

  }