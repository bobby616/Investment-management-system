import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  token: string;

  constructor(private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit() {
    this.token = jwt_decode(localStorage.getItem('token'));
  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

}
