import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
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

  public contactForm!: FormGroup;
  public statutUtilisateur: any;

  public listeUtilisateur: any;
  public idStatut: any;
  public listeMateriel: any;
  public listeLieuStockage: any;
  public messageValidationCreationCompte: any;
  public messageErreurValidationCreationCompte: any;

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
      "idStatut": ["", [Validators.required]],
    }
  );

  constructor(
    private http: HttpClient,
    private tokenIdentification: TokenIdenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({ statutUtilisateur: [null] });
    this.http.get("http://localhost:8080/liste-statut").subscribe(reponse => this.idStatut = reponse); //permet de récupérer la liste depuis la BDD
    this.http.get("http://localhost:8080/liste-typeMateriels").subscribe(reponse => this.listeMateriel = reponse);
    this.http.get("http://localhost:8080/gestionnaire/liste-lieuxStockage").subscribe(reponse => this.listeLieuStockage = reponse);
  }

  //méthode pour envoyer les données du formulaire dans la BDD avec mdp hasher 
  donneesFormulaire(donnees: { nom: string, prenom: string, motDePasse: string, adresse: string, ville: string, codePostale: string, mail: string, numeroTelephone: string, statut: { idStatut: number } }) {

    //this.donneesFormulaire = donnees: {nom : donnees.nom, prenom: donnees.prenom, motDePasse:donnees.motDePasse, adresse:donnees.adresse, ville:donnees.ville, codePostale:donnees.codePostale, mail:donnees.mail, numeroTelephone:donnees, statut: {idStatut: number} })
    this.http.post('http://localhost:8080/donnees-CreationCompte', donnees, { responseType: 'text' })
      .subscribe((response) => {
        this.messageValidationCreationCompte = response;
        alert("Le compte à bien été crée")
        console.log(response)
      }, (error) => {
        this.messageErreurValidationCreationCompte = "Une erreur est survenue lors de la création du compte"
      }
      );
  }

  closePopUpCreationCompte() {
    this.messageErreurValidationCreationCompte = '';
  }
}
