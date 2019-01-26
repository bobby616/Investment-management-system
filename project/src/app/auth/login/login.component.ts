import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/user/models/user.model';
import { Role } from 'src/app/models/roles';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  styles: ['./login.component.css'] ,
  providers: [LoginService],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: ToastrService,
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
  ) { }


  // Reactive forms
  ngOnInit() {

    const email = this.formBuilder.control('', [Validators.required]);
    const password = this.formBuilder.control('', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      email,
      password,
    });
  }

  successToast() {
    this.notificator.success('', 'Login successfull!', { timeOut: 1000 });
  }

  errToast() {
    this.notificator.error('', 'Wrong credentials!', { timeOut: 1000 });
  }

  public login(): void {
    this.loading = true;

    const user: UserModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    
    /* this.authService.loginUser(this.loginForm.value).subscribe(
      () => {
        this.notificator.success('Logged in successfully!');
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.notificator.error('Reason...', 'Login failed!');
      }
    ); */


    this.loginService.login(user, { observe: 'response', responseType: 'json' })
      .subscribe((data: { message: string, token: string }) => {
        localStorage.setItem('token', data.token);
        this.successToast();
        const role = this.authService.getRole();

        if (role === Role.admin) {
          this.router.navigate(['/admin']);
          this.loading = false;

        } else if (role === Role.manager) {

          this.router.navigate(['/manager']);
          this.loading = false;
        }

      }, (err: HttpErrorResponse) => {
        // console.log('err', err);

        this.errToast();
      });
    this.loginForm.reset();
  }

  public cancel(): void {
    this.router.navigate(['/home']);
  }
}
