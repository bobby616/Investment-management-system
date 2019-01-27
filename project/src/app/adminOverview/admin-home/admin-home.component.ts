import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  token: string;

  constructor() { }

  ngOnInit() {
    this.token = jwt_decode(localStorage.getItem('token'));
  }

}
