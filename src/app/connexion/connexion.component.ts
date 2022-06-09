import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnexionDeconnexionService } from '../connexion-deconnexion.service';
import { TokenIdentificationService } from '../token-identification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public admin: boolean = false;
  private utilisateurConnecte!: boolean;

  public formControl: FormGroup = this.formBuilder.group(
    {
      "mail": ["", [Validators.required, Validators.email]],
      "motDePasse": ["", [Validators.required]]
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private client: HttpClient,
    private tokenIdentification: TokenIdentificationService,
    private router: Router,
    private connexionDeconnexionService: ConnexionDeconnexionService
  ) { 
    this.connexionDeconnexionService.utilisateurConnecte.subscribe( value => { //Permet la maj des boutons quand un changement est effectué sur le service 
      this.utilisateurConnecte = value;
      });
  }

  ngOnInit(): void {
  }

  onConnexion(): void {

    if (this.formControl.valid) {

      const utilisateur = this.formControl.value;

      //recupérer le token 
      // Message pour la connection 
      this.client
        .post("http://"+ environment.adresseServeur +"/connexion", utilisateur)
        .subscribe((resultat: any) => {
          if (resultat.erreur) {
            alert(resultat.erreur);
          } else {
            localStorage.setItem('token', resultat.token)
            this.tokenIdentification.raffraichirUtilisateur();

            if (this.tokenIdentification.utilisateur.value.droits.includes("ROLE_GESTIONNAIRE")) {
              this.router.navigateByUrl("page-gestionnaire");
              this.connexionDeconnexionService.utilisateurConnecte.next(true);
            } else {
              this.router.navigateByUrl("page-etudiant");
              this.connexionDeconnexionService.utilisateurConnecte.next(true);
            }
          }
        })

    }


  }

}
