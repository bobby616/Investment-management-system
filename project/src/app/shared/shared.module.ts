import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [МodalComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, МodalComponent, RouterModule]
})
export class SharedModule {}
