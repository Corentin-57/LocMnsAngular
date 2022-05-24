import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenIdentificationService } from '../token-identification.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public admin: boolean = false;

  public formControl: FormGroup = this.formBuilder.group(
    {
      "email": ["", [Validators.required, Validators.email]],
      "motDePasse": ["", [Validators.required]]
    }
  )

  constructor(
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenIdentification: TokenIdentificationService
  ) { }

  ngOnInit(): void {
  }

  onConnexion(): void{

    if(this.formControl.valid){
      const utilisateur = this.formControl.value; //Récupère un objet avec les champs précisés
      this.client.post("http://localhost:8080/connexion", utilisateur) //Passe un objet utilisateur transformé en Java
      .subscribe((resultat:any) =>{
        if(resultat.erreur){
          alert(resultat.erreur) //Affiche le message mauvais login/ mot de passe dans Spring
        }else{
          localStorage.setItem('token', resultat.token) //Permet de stocker des infos
          this.tokenIdentification.raffraichirUtilisateur();

          // this.tokenIdentification.utilisateur.subscribe(
          //   utilisateur => {
          //     this.admin = utilisateur.droits.incudes("ROLE_ADMIN");
          //   }
          // )

          // if(this.admin)
          //   this.router.navigateByUrl("page-gestionnaire");
          // else{
          //   this.router.navigateByUrl("page-etudiant");
          // }
        }
      })
    }
  }

}
