import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './component/stock.component';

@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    SharedModule, StockRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class StockModule { }
