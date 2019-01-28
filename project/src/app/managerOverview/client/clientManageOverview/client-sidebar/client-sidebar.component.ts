import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./../../../../components/home/home.component.css']
})
export class ClientSidebarComponent implements OnInit {
  id: string;
  client: Client;


  constructor(private readonly route: ActivatedRoute,
    private readonly clientService: ClientService,
    private readonly router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    
    if(id){
      this.getClientByID(id);
    }
  }

  getClientByID(id: string) {
    this.clientService.getClient(id).subscribe(
    (client) => {
      this.client = client;
    });
  }

  onBack(){
    this.router.navigate(['manager/clients']);
  }
}
