import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [МodalComponent, HomeComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, МodalComponent, RouterModule, HomeComponent]
})
export class SharedModule {}
