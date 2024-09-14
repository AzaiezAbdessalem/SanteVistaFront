import { AuthService } from 'src/app/service/auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService:AuthService){

  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Get the authentication token from local storage or wherever you store it

    let authRequest = request;

    if (token) {
      // Clone the request and add the authorization header
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the modified request to the next handler and handle errors
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status)
        if (error.status === 401) {
        //  this.authService.logoutAuth()
          
        }
        return throwError(error);
      })
    );
  }
}
