import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenIdentificationService {

  constructor() { }

  public utilisateur: BehaviorSubject<any> = new BehaviorSubject(null); //Création d'un observable

  public raffraichirUtilisateur(){

    if(localStorage.getItem("token") != null){
      const token: any = localStorage.getItem("token") //Récupère le token
  
      try{
        this.utilisateur.next(JSON.parse(atob(token.split(".")[1]))); //Récupére la partie du milieu du token et transforme les informations en objet
      //Tous les composants qui ont souscrits à l'observable vont récupérer le corps du token
      }catch{
        this.utilisateur.next(null);
        console.log("CATCH");
      }
    }else{
      this.utilisateur.next(null);
      console.log("ELSE");
    }
    console.log(this.utilisateur);
  }
}
