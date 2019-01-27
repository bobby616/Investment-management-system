import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientModel } from '../models/client-model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  providers: [AdminService],
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly adminService: AdminService) { }

  ngOnInit() {
    const firstName = this.formBuilder.control('', [Validators.required]);
    const lastName = this.formBuilder.control('', [Validators.required]);
    const email = this.formBuilder.control('', [Validators.required]);
    const balance = this.formBuilder.control('', [Validators.required]);
    const age = this.formBuilder.control('', [Validators.required]);
    const address = this.formBuilder.control('', [Validators.required]);
    const managerEmail = this.formBuilder.control('', [Validators.required]);

    this.registerForm = this.formBuilder.group({
      firstName,
      lastName,
      email,
      balance,
      age,
      address,
      managerEmail
    });
  }

  public create(){
    const client: ClientModel = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      amount: this.registerForm.value.balance,
      age: this.registerForm.value.age,
      address: this.registerForm.value.address,
      managerEmail: this.registerForm.value.managerEmail,
    }
    console.log(client);

    this.adminService.createClient(client);

  }

}
