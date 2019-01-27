import { RequesterService } from '../core/requester.service';
import { ClientModel } from './models/client-model';
import { Observable } from 'rxjs';
import { AppConfig } from '../common/app.config';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminModel } from './models/admin-model';

@Injectable()
export class AdminService{

    constructor(private readonly requester: RequesterService,
        private readonly app: AppConfig,
        private readonly toastService: ToastrService,
        ) {}


    public createClient(client: ClientModel): void {
        this.requester.post(
        `${this.app.apiUrl}/users/createClient`, client).subscribe((data) => {
            this.toastService.success('', 'Successfully added');
        },
            (err: HttpErrorResponse) => {
                this.toastService.error('', 'Error occurred!');
            });
    }
    public createAdmin(admin: AdminModel): void {
        this.requester.post(
        `${this.app.apiUrl}/users/createAdmin`, admin).subscribe((data) => {
            this.toastService.success('', 'Successfully added');
        },
            (err: HttpErrorResponse) => {
                this.toastService.error('', 'Error occurred!');
            });
    }
}