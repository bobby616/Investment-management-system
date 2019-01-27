import { Component } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  token = jwt_decode(localStorage.getItem('token'));
  constructor(private readonly authService: AuthenticationService,
    private readonly router: Router) {}
  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
