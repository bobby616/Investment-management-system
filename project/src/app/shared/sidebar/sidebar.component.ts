import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  token = jwt_decode(localStorage.getItem('token')) 

  constructor() { }

  ngOnInit() {
    
  }
  
}
