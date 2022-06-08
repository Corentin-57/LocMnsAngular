import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  lienTableauBord: boolean = false;

  constructor(
    private tokenIdentification: TokenIdentificationService,
    private connexionDeconnexionService: ConnexionDeconnexionService,
    ) { 
      this.connexionDeconnexionService.utilisateurConnecte.subscribe( value => { //Permet la maj des boutons quand un changement est effectué sur le service 
        
        this.tokenIdentification.raffraichirUtilisateur();

        if(this.tokenIdentification.utilisateur.value != null && (this.tokenIdentification.utilisateur.value.droits.includes("ROLE_GESTIONNAIRE") || this.tokenIdentification.utilisateur.value.droits.includes("ROLE_UTILISATEUR")) ){ //Vérifie si utilisateur est connecté et affiche bouton deconnexion si c'est la cas 
          this.utilisateurConnecte = true;
          
        }else{
          this.utilisateurConnecte = value;
        }

        if(this.tokenIdentification.utilisateur.value != null && this.tokenIdentification.utilisateur.value.droits.includes("ROLE_GESTIONNAIRE")){ //Change le lien de direction du tableau de bord si etudiant ou gestionnaire
          this.lienTableauBord = true;
        }else{
          this.lienTableauBord = false;
        }
      })
    
    
    }

  ngOnInit(): void {
  
  }


  Deconnexion(): void{ //Suppresion du token lors de la déconnexion et changement bouton
    localStorage.removeItem("token");
    this.connexionDeconnexionService.utilisateurConnecte.next(false);
  }



}
