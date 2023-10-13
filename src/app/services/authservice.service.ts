import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/customer.model';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  accessToken ! : any ;
  refreshToekn! : any ;
  isAuthanticated :boolean=false;
  username! : any;
  roles! : any[];


  constructor(private http :HttpClient,private router : Router) { }

  logIn(Username: string , password : string):Observable<any>{
    let user : User={
      username:Username,
      password:password
    };
    let options={
      headers:new HttpHeaders().set("content-type","application/json")
    }
    return this.http.post(environment.backendHost+"/auth/logIn",user,options);
  }

  loadProfil(data : any ){
    this.accessToken = data.accessToken;
    this.refreshToekn= data.refreshToken;
    if(this.accessToken && this.refreshToekn){
      window.localStorage.setItem("accessToken",this.accessToken);
      window.localStorage.setItem("refreshToken",this.refreshToekn);
      this.isAuthanticated = true;
      let decodeJwt : any  = jwtDecode(this.accessToken);
      this.username = decodeJwt.sub;
    this.roles = decodeJwt.roles;
      this.router.navigateByUrl('/auth');
    }
    else{
      this.router.navigateByUrl('/login');

    }
  }

  refreshing():Observable<any>{
    return this.http.get(environment.backendHost+'/refreshToken');
  }


  logOut(){
    this.isAuthanticated=false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl('/login');
  }
}
