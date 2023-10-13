import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorozitionGuard implements CanActivate {

  constructor(private authservice : AuthserviceService,private route : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("authr guarsd");
      if(this.authservice.roles.length!=0 && this.authservice.roles){
      const authorities = this.authservice.roles;
      for (const authority  of authorities) {
        if(authority.includes('ADMIN'))
        return true;
      }
    }
    this.route.navigateByUrl("/403");
    return false;
  }
}
