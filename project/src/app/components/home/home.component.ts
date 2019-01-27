import { Component } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  token = jwt_decode(localStorage.getItem('token'));
}
