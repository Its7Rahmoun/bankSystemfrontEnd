import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';


@Injectable()
export class ApphttpInterceptor implements HttpInterceptor {
  refresh : boolean = false;

  constructor(private authservice : AuthserviceService,private router :Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('/refreshToken')){
      const authReq = this.addAuthorizationHeader(request,this.authservice.refreshToekn);
      return next.handle(authReq).pipe(catchError(
        (err : any )=>{
          this.authservice.logOut();
          return throwError('your session has been expired...')
        }
      ));
    }
    else if (!request.url.includes('/auth/logIn')) {
      const authReq = this.addAuthorizationHeader(request,this.authservice.accessToken);
      return next.handle(authReq).pipe(
        catchError( (err : any ) =>{
          if(err.status===401 || err.status===403){
            return this.handleRefrehToken(request,next);
          }
          this.authservice.logOut();
          return throwError(err); 
        })
      );
    } else {
      return next.handle(request);
    }
  }
  
  

  private addAuthorizationHeader(request: HttpRequest<unknown>,token : any): HttpRequest<unknown> {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }


  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authservice.refreshing().pipe(
      switchMap((data: any) => {
        this.authservice.loadProfil(data);
        return next.handle(this.addAuthorizationHeader(request,this.authservice.accessToken))
      }),
      catchError(errodata=>{
        this.authservice.logOut();
        return throwError(errodata)
      })
    );
  }


}
