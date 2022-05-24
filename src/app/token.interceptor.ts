import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let enTete;

    if (localStorage.getItem('token') != null) {

      enTete = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',   // permet de lier les domaines provenant de différentes origine
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })

    } else {
      enTete = new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })

    }

    const requeteClone = request.clone({
      headers: enTete
    });

    return next.handle(requeteClone);
  }
}
