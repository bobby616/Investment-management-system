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
  id: string;
  client: Client;
  clientSubscription: Subscription;
  constructor(private readonly authService: AuthenticationService,
    private readonly route: ActivatedRoute,
    private readonly clientService: ClientService,
    private readonly router: Router,
    private readonly dataService: DataService,
    private readonly localStorage: StorageService) { }

  ngOnInit() {
    this.clientSubscription= this.clientService.getClient(this.localStorage.getItem('id')).subscribe((client) => {
      this.client = client
    })
    this.token = jwt_decode(localStorage.getItem('token'));
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onBack(){
    this.dataService.changeIsClient(null)
    this.localStorage.removeItem('id')
    this.client = null;
    this.router.navigate(['manager']);
    window.location.reload();
  }
  ngOnDestroy() {
    this.localStorage.removeItem('id')
    if(this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
  } 
}
