import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ClientModel } from 'src/app/adminOverview/models/client-model';
import { Client } from './models/client.model';

@Injectable()
export class DataService {

  private dataSource = new ReplaySubject<Client>(1);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeIsClient(client: Client) {
    console.log(client)
    this.dataSource.next(client);
  }

}