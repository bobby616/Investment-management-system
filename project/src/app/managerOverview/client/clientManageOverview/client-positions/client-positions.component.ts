import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from '../../models/client.model';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-client-positions',
  templateUrl: './client-positions.component.html',
  styleUrls: ['./client-positions.component.css']
})
export class ClientPositionsComponent implements OnInit {
  clientSubscription: Subscription;
  client: Client;
  

  constructor(
    private readonly dataService: DataService,
  ) { }

  ngOnInit() {
    this.clientSubscription = this.dataService.currentData.subscribe(client => {
      this.client = client
    })
  }

  ngOnDestroy() {
    if(this.clientSubscription){
      this.clientSubscription.unsubscribe();
    }
  }

  



}
