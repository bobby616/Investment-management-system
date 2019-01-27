import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AdminModel } from '../models/admin-model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly adminService: AdminService) { }

  ngOnInit() {
    const firstName = this.formBuilder.control('', [Validators.required]);
    const lastName = this.formBuilder.control('', [Validators.required]);
    const password = this.formBuilder.control('', [Validators.required]);
    const adminEmail = this.formBuilder.control('', [Validators.required]);

    this.registerForm = this.formBuilder.group({
      firstName,
      lastName,
      password,
      adminEmail
    });
  }

  public create(){
    const admin: AdminModel = {
      fullname: this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName,
      email: this.registerForm.value.adminEmail,
      password: this.registerForm.value.password,
    }
    console.log(admin);

    this.adminService.createAdmin(admin);

  }

}
