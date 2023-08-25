import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appservice } from './appservice.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  constructor(private authService: Appservice) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('token');
    return request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
    })
  }
}


