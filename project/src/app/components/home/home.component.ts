import { Component, Input } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from 'src/app/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/managerOverview/client/client.service';
import { Client } from 'src/app/managerOverview/client/models/client.model';
import { DataService } from 'src/app/managerOverview/client/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  token: string;
  id: string;
  client: Client;
  isClient: boolean;
  isClientSubscription: Subscription;
  clientIdSubscription: Subscription;
  constructor(private readonly authService: AuthenticationService,
     private readonly route: ActivatedRoute,
    private readonly clientService: ClientService,
    private readonly router: Router,
    private readonly dataService: DataService) { }

  ngOnInit() {
    this.isClientSubscription = this.dataService.currentData.subscribe(isClient => {this.isClient = isClient
    console.log(isClient)})
    this.route.url.subscribe(url =>{
      this.id = this.route.snapshot.paramMap.get('id');
      console.log(url);
 });

    this.token = jwt_decode(localStorage.getItem('token'));
    console.log(this.id)
    if (this.id) {
      this.getClientByID(this.id);
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  getClientByID(id: string) {
    this.clientIdSubscription = this.clientService.getClient(id).subscribe(
    (client) => {
      this.client = client;
    });
  }

  onBack(){
    this.router.navigate(['manager/clients']);
  }
  ngOnDestroy() {
    this.isClientSubscription.unsubscribe();
    this.clientIdSubscription.unsubscribe();
  } 
}
