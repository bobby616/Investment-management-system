import { Component, Input } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from 'src/app/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/managerOverview/client/client.service';
import { Client } from 'src/app/managerOverview/client/models/client.model';
import { DataService } from 'src/app/managerOverview/client/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  token: string;
  id: string;
  client: Client;
  ClientSubscription: Subscription;
  constructor(private readonly authService: AuthenticationService,
     private readonly route: ActivatedRoute,
    private readonly clientService: ClientService,
    private readonly router: Router,
    private readonly dataService: DataService) { }

  ngOnInit() {
    this.ClientSubscription = this.dataService.currentData.subscribe(client => {this.client = client
    console.log(this.client)})
    this.token = jwt_decode(localStorage.getItem('token'));
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onBack(){
    this.client = null;
    this.router.navigate(['manager/clients']);
  }
  ngOnDestroy() {
    this.ClientSubscription.unsubscribe();
  } 
}
