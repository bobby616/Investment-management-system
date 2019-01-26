import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  token = jwt_decode(localStorage.getItem('token')) 

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('../../../assets/thumbs-up.svg'));
  }
  ngOnInit() {
    
  }
  
}
