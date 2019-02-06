import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {

  constructor(
    private readonly localStorage: StorageService,
    private readonly router: Router) { }

  backToManager() {
    this.localStorage.removeItem('clientId');
    this.router.navigate['/manager'];
  }


}
