import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenIdentificationService } from '../token-identification.service';
import { ConnexionDeconnexionService } from '../connexion-deconnexion.service';
import { environment } from 'src/environments/environment';


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
  )

constructor(
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenIdentification: TokenIdentificationService,
    private connexionDeconnexionService: ConnexionDeconnexionService
  ) {       
    this.connexionDeconnexionService.utilisateurConnecte.subscribe( value => { //Permet la maj des boutons quand un changement est effectué sur le service 
    this.utilisateurConnecte = value;
    });
}

  ngOnInit(): void {
  }

  onConnexion(): void{

    if(this.formControl.valid){
      const utilisateur = this.formControl.value; //Récupère un objet avec les champs précisés
      this.client.post("http://" + environment.adresseServeur + "/connexion", utilisateur) //Passe un objet utilisateur transformé en Java
      .subscribe((resultat:any) =>{
        if(resultat.erreur){
          alert(resultat.erreur) //Affiche le message mauvais login/ mot de passe dans Spring
        }else{
          console.log(resultat.token)
          localStorage.setItem('token', resultat.token) //Permet de stocker des infos
          
          this.tokenIdentification.raffraichirUtilisateur();

          console.log(this.tokenIdentification.utilisateur.value);
          if(this.tokenIdentification.utilisateur.value.droits.includes("ROLE_GESTIONNAIRE")){
            this.router.navigateByUrl("page-gestionnaire");
            this.connexionDeconnexionService.utilisateurConnecte.next(true);
          }else{
            this.router.navigateByUrl("page-etudiant");
            this.connexionDeconnexionService.utilisateurConnecte.next(true);
          }
        }
      })
    }
  }

}
