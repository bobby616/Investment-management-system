import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ManagerModel } from '../models/manager-model';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly adminService: AdminService,
  ) { }


  // Reactive forms
  ngOnInit() {
    
    const fullname = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);
    const email = this.formBuilder.control('', [Validators.required, Validators.email]);
    const password = this.formBuilder.control('', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)]);
    this.registerForm = this.formBuilder.group({
      fullname,
      email,
      password,
    });
  }

  public register(): void {
    const manager: ManagerModel = {
      fullname: this.registerForm.value.fullname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.adminService.createManager(manager);
  
    this.registerForm.reset();
  }

  public cancel(): void {
    this.router.navigate(['/home']);
  }
}
