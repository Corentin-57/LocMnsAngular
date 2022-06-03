
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenIdentificationService } from '../token-identification.service';


@Component({
  selector: 'app-page-gestionnaire',
  templateUrl: './page-gestionnaire.component.html',
  styleUrls: ['./page-gestionnaire.component.scss']
})
export class PageGestionnaireComponent implements OnInit {

  public contactForm!:FormGroup;

  public listeUtilisateur: any;
  public admin: boolean = false;

  public statutUtilisateur = [ {name:"Etudiant"}, {name:"Intervenant"} ];

  public idEmprunt!: number;
  public listeDemandesEmprunt: any;
  public listeRetoursEmprunt: any;


  public DemandeEmprunt: any;

  public messageValidationDemandeEmprunt!: any;
  public messageErreurValidationDemandeEmprunt!: any;

  public messageValidationRetourEmprunt!: any;
  public messageErreurValidationRetourEmprunt!: any;

  public dateDemandeEprunt!: Date;
  public dateDemandeRetour!: Date;
  
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
      "numeroTelephone": ["", [Validators.required]]
    }
  );

  constructor(
    private client: HttpClient,
    private tokenIdentification: TokenIdentificationService,
    private router: Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group( { statutUtilisateur: [null]});
    //this.http.get("http://localhost:8080/liste-typeMateriels").subscribe(reponse => this.listeTypesMateriel = reponse)
    //this.affichageDemandesPret;
    this.affichageDemandesPret();
    this.affichageRetoursPret();
  }

  donneesFormulaire(donnees: {nom: string, prenom: string, motDePasse: string, adresse: string, ville: string, codePostale: string, mail: string, numeroTelephone: string, statutUtilisateur:string} ) {
    
    console.log(donnees);
    console.log("formulaire envoyé ")
    console.log('valeurs liste déroulante: ', JSON.stringify(this.contactForm.value));
    console.log(this.contactForm.value);
    this.client.post('http://localhost:8080/donnees-CreationCompte', donnees)
    .subscribe((response) => {
        console.log(response);
    });
    
    
  }


  submitListe(): void {
    console.log("FORM Submitted")
    console.log('valeurs liste déroulanteeeeeee: ', JSON.stringify(this.contactForm.value));
    console.log(this.contactForm.value);
  }

  affichageDemandesPret(): void {
    this.client.get("http://localhost:8080/gestionnaire/listeDemandesEmprunt").subscribe(reponse => this.listeDemandesEmprunt = reponse); //Récupére la liste des toutes les demandes d'emprunt en cours
  }

  affichageRetoursPret(): void {
    this.client.get("http://localhost:8080/gestionnaire/listeRetoursEmprunt").subscribe(reponse => this.listeRetoursEmprunt = reponse); //Récupére la liste des toutes les demandes d'emprunt en cours
    
  }

  validerDemandeEmprunt(idEmprunt: number){
    this.client.post('http://localhost:8080/gestionnaire/valider-demande-emprunt', {idEmprunt: idEmprunt},{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationDemandeEmprunt = reponse;
        this.affichageDemandesPret();
      },
      (error) => {
        this.messageErreurValidationDemandeEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
    
  }

  supprimerDemandeEmprunt(idEmprunt: number){
    this.client.delete('http://localhost:8080/gestionnaire/supprimer-demande-emprunt/' + idEmprunt,{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationDemandeEmprunt = reponse;
        this.affichageDemandesPret();
      },
      (error) => {
        this.messageErreurValidationDemandeEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
    
  }

  validerRetourEmprunt(idEmprunt: number){
    this.client.put('http://localhost:8080/gestionnaire/valider-retour-emprunt', {idEmprunt: idEmprunt},{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationRetourEmprunt = reponse;
        this.affichageRetoursPret();
      },
      (error) => {
        this.messageErreurValidationRetourEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
  }

  supprimerDemandeRetour(idEmprunt: number){
    this.client.put('http://localhost:8080/gestionnaire/supprimer-retour-emprunt', {idEmprunt: idEmprunt}, {responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationRetourEmprunt = reponse;
        this.affichageRetoursPret();
      },
      (error) => {
        this.messageErreurValidationRetourEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
        console.log(error);
      }
    )
  }

  public cacherMessage(): void{
    this.messageValidationDemandeEmprunt = "";
    this.messageErreurValidationDemandeEmprunt = "";
    this.messageErreurValidationRetourEmprunt = "";
    this.messageValidationRetourEmprunt = "";
  }

  

}