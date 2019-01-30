import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject(false);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeIsClient(isClient: boolean) {
    console.log(`updated with ${isClient}`)
    this.dataSource.next(isClient)
  }

}