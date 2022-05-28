import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionDeconnexionService { //Service qui permet d'utiliser le behaviorSubject sur connexion et header et maj à chaque changement
  public utilisateurConnecte: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
