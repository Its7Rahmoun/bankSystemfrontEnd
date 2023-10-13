import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin : boolean=false;

  constructor(public authservice :AuthserviceService ,private router: Router) { }

  ngOnInit(): void {
    if(this.authservice.roles.length!=0 && this.authservice.roles){
      const authorities = this.authservice.roles;
      for (const authority  of authorities) {
        if(authority.includes('ADMIN')){
          this.isAdmin= true;
          return;
        }
      }
    }
  }

  handleLogout(){
    this.authservice.logOut();
  }

}
