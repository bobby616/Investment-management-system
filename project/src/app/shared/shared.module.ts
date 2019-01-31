import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { StocksService } from '../stock/stock.service';
import { FundsService } from '../stock/funds.service';

@NgModule({
  declarations: [ModalComponent, HomeComponent],
  imports: [
    CommonModule, 
    RouterModule, 
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatInputModule],
    providers: [],
  exports: [CommonModule, ModalComponent, RouterModule, HomeComponent]
})
export class SharedModule {}
