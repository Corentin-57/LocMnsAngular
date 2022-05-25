import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { TokenIdentificationService } from './token-identification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenIdentification: TokenIdentificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let enTete;

    if(localStorage.getItem('token' )!= null){ //Vérifie l'existence du token dans le local storage

      enTete = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token') //Ajouter le token dans récupérer dans entête nouvelle requête
      })
    }else{
      enTete = new HttpHeaders({
        'Access-Control-Allow-Origin': '*' //Rajoute tout le temps dans l'entête
      })
    }

    const requeteClone = request.clone({//Clone reqête car on ne peut pas la modifier directement
      headers: enTete
    });

    return next.handle(requeteClone); //Next sert à retourner la requête
  }
}
