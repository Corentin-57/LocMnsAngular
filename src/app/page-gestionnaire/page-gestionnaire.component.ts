import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenIdenticationService } from '../token-identication.service';


@Component({
  selector: 'app-page-gestionnaire',
  templateUrl: './page-gestionnaire.component.html',
  styleUrls: ['./page-gestionnaire.component.scss']
})
export class PageGestionnaireComponent implements OnInit {

  public contactForm!:FormGroup;
  public statutUtilisateur: any;

  public listeUtilisateur: any;
  public listeStatut: any;
  public idStatut: any;
  public listeMateriel: any;
  public lieuxStockage: any;
  
  public admin: boolean = false;
  
  // permet de vérifier si les informations formulaire sont bien saisies
  public formControl: FormGroup = this.formBuilder.group(
    {
      "nom": ["", [Validators.required]],
      "prenom": ["", [Validators.required]],
      "motDePasse": ["", [Validators.required]],
      "adresse": ["", [Validators.required]],
      "ville": ["", [Validators.required]],
      "codePostale": ["", [Validators.required]],
      "mail": ["", [Validators.required]],
      "numeroTelephone": ["", [Validators.required]],
      "listeStatut": ["", [Validators.required]]
    }
  );

  constructor(
    private http: HttpClient,
    private tokenIdentification: TokenIdenticationService,
    private router: Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group( { statutUtilisateur: [null]});
    this.http.get("http://localhost:8080/liste-statut").subscribe(reponse => this.listeStatut = reponse);
    this.http.get("http://localhost:8080/liste-typeMateriels").subscribe(reponse => this.listeMateriel = reponse);
    this.http.get("http://localhost:8080/liste-lieuxStockage").subscribe(reponse => this.lieuxStockage = reponse);
  }

  //méthode pour envoyer les données du formulaire dans la BDD avec mdp hasher 
  donneesFormulaire(donnees: {nom:string, prenom:string, motDePasse:string, adresse:string, ville:string, codePostale:string, mail:string, numeroTelephone:string, listeStatut:string,statut: {idStatut:number} }) {
    
    this.http.post('http://localhost:8080/donnees-CreationCompte', donnees)
    .subscribe((response) => {
        console.log(response)
    });
  }


}
