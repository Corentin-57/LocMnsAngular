import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenIdentificationService } from './token-identification.service';

@Injectable({
  providedIn: 'root'
})
export class GestionnaireGuard implements CanActivate {

  constructor(
    private tokenIdentification: TokenIdentificationService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.tokenIdentification.utilisateur.value);
      console.log('caca');
      if(this.tokenIdentification.utilisateur.value != null && this.tokenIdentification.utilisateur.value.droits.includes("ROLE_GESTIONNAIRE")){
        console.log("c");
        return true;
      }else{
      return this.router.parseUrl('/connexion');
      }
  }
  
}
