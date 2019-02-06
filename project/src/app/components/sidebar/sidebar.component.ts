import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from 'src/app/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/managerOverview/client/client.service';
import { Client } from 'src/app/managerOverview/client/models/client.model';
import { DataService } from 'src/app/managerOverview/client/data.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  token: string;
  clientId: string = '';
  client: Client;
  clientSubscription: Subscription;
  constructor(
    private readonly authService: AuthenticationService,
    private readonly clientService: ClientService,
    private readonly router: Router,
    private readonly localStorage: StorageService) { }

  ngOnInit() {
    this.token = jwt_decode(localStorage.getItem('token'));
    this.clientId = localStorage.getItem('clientId');
    this.clientSubscription= this.clientService.getClient(this.clientId).subscribe((client) => {
      this.client = client;
    })
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onBack(){
    this.localStorage.removeItem('clientId')
    this.router.navigate(['/manager']);
    window.location.reload();
  }

}
