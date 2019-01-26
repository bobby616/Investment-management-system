import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}


  public register(userData: UserModel): void {
    this.authService.registerUser(userData).subscribe(
      () => {
        this.notificator.success('Registered successfully!');
        this.router.navigate(['/users/login']);
      },
      error => {
        console.log(error);
        this.notificator.error('Reason...', 'Registration failed!');
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['/home']);
  }
}
