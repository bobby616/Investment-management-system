import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@NgModule({
  declarations: [МodalComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, МodalComponent, RouterModule, SidebarComponent]
})
export class SharedModule {}
