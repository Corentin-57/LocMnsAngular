import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenIdenticationService } from '../token-identication.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public formControl: FormGroup = this.formBuilder.group(
    {
      "mail": ["", [Validators.required, Validators.email]],
      "motDePasse": ["", [Validators.required]]
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private client: HttpClient,
    private tokenIdentification: TokenIdenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onConnexion(): void {

    if (this.formControl.valid) {

      const utilisateur = this.formControl.value;

      //recupérer le token 
      // Message pour la connection 
      this.client
        .post("http://localhost:8080/connexion", utilisateur)
        .subscribe((resultat: any) => {
          if (resultat.erreur) {
            alert(resultat.erreur);
          } else {
            localStorage.setItem('token', resultat.token)
            this.tokenIdentification.raffraichir(); // permet d'afficher le message de bienvenue pour n'importe quel utilisateur
            this.router.navigateByUrl("");   // router en rapport avec la dépendance injecter 
          }
        })
    }

  }

}
