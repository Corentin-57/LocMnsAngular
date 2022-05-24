import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenIdenticationService {

  constructor() { }

  public utilisateur: BehaviorSubject<any> = new BehaviorSubject(null)

  public raffraichir(){

    if (localStorage.getItem("token") != null) {

      const token: any = localStorage.getItem("token");  // récuperer le token 

      try {
        this.utilisateur.next(JSON.parse(atob(token.split(".")[1])));
        //return JSON.parse(atob(token.split(".")[1]));  // récupère uniquement le payLoad du Token
        // atob permet de retranscrire le payLoad du token 
      } catch {
        this.utilisateur.next(null);
      }
    } else {
      this.utilisateur.next(null);
    }

  }
}
