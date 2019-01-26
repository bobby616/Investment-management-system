
import { SentenceCasePipe } from './../pipes/sentence-case.pipe';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDataService } from './services/users-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfig } from '../common/app.config';

@NgModule({
  imports: [SharedModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    RegisterComponent,
    UsersListComponent,
    SentenceCasePipe,
  ],
  providers: [UserDataService]
})
export class UserModule { }
