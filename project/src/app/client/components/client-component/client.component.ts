import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  users: [{ name: 'Pesho', age: 22 }, { name: 'Tosho', age: 25 }]

  constructor() { }

  ngOnInit() {
  }

}
