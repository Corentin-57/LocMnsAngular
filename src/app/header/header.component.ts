import { Component, OnInit } from '@angular/core';
import { ConnexionDeconnexionService } from '../connexion-deconnexion.service';
import { TokenIdentificationService } from '../token-identification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cheminLogo:any = "assets/header/logo.svg";
  utilisateurConnecte!: boolean; //Variable qui affiche et cache les boutons connexion/ deconnexion

  constructor(private tokenIdentification: TokenIdentificationService,
    private connexionDeconnexionService: ConnexionDeconnexionService) { 
      this.connexionDeconnexionService.utilisateurConnecte.subscribe( value => { //Permet la maj des boutons quand un changement est effectué sur le service 
        this.utilisateurConnecte = value;
      })
    
    }

  ngOnInit(): void {
  }


  Deconnexion(): void{ //Suppresion du token lors de la déconnexion et changement bouton
    localStorage.removeItem("token");
    this.connexionDeconnexionService.utilisateurConnecte.next(false);
  }



}
