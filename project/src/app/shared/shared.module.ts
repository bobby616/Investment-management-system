import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [МodalComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, МodalComponent, SidebarComponent, RouterModule]
})
export class SharedModule {}
