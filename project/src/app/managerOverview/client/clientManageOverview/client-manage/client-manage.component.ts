import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.css']
})
export class ClientManageComponent implements OnInit {

  client: Client | undefined;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly clientService: ClientService) { }

  

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
    this.router.navigate(['manager/clients', this.client.id]);
  }
}
