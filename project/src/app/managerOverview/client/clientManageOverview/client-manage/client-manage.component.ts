import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.css']
})
export class ClientManageComponent implements OnInit {

  client: Client | undefined;
  clientSubscription: Subscription
  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataService) { }

  

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
  onBack(){
    this.router.navigate(['manager/clients', this.client.id]);
  }


}