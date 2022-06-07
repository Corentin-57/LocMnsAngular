import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenIdentificationService } from './token-identification.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantGuard implements CanActivate {

  constructor(
    private tokenIdentification: TokenIdentificationService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenIdentification.utilisateur.value != null && this.tokenIdentification.utilisateur.value.droits.includes("ROLE_UTILISATEUR")){
      return true;
    }
    return this.router.parseUrl('/connexion');
  }
  
}
