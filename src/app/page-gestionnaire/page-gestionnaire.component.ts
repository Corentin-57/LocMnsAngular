import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenIdentificationService } from '../token-identification.service';


@Component({
  selector: 'app-page-gestionnaire',
  templateUrl: './page-gestionnaire.component.html',
  styleUrls: ['./page-gestionnaire.component.scss']
})
export class PageGestionnaireComponent implements OnInit {

  public contactForm!: FormGroup;

  public listeStatut: any;
  public donneesDemandeCreationCompte!:any;
  public donnees:any;
  public statut:any;
  public idStatut!: number;
  
  //formulaire création de compte
  public nomSaisie!: any;
  public prenomSaisie!: any;
  public mdpSaisie!: any;
  public adresseSaisie!: any;
  public villeSaisie!: any;
  public codePostalSaisie!: any;
  public mailSaisie!: any;
  public telephoneSaisie!: any;


  public listeUtilisateur: any;
  public admin: boolean = false;
  public idUtilisateurConnecte!: number;
  public statutUtilisateur: any;

  public idEmprunt!: number;
  public idNumeroMateriel!: number;

  public listeDemandesEmprunt: any;
  public listeRetoursEmprunt: any;
  public listeProlongationEmprunt!: any;
  public listeNumeroSerieMateriel!: any;

  public nombreDemandesEmprunt!: number;
  public nombreRetoursEmprunt!: number;
  public nombreProlongationEmprunt!: number;
  public nombreMaterielDefectueux!: number;
  public nombreMaterielRetard!: number;
  public nombreMaterielOperationnel!: number;

  public DemandeEmprunt: any;

  public messageValidationDemandeEmprunt!: any;
  public messageErreurValidationDemandeEmprunt!: any;

  public messageValidationRetourEmprunt!: any;
  public messageErreurValidationRetourEmprunt!: any;

  public messageValidationProlongationEmprunt!:any;
  public messageErreurValidationProlongationEmprunt!: any;

  public messageValidationReservation!: any;
  public messageErreurReservation!: any;

  public dateDemandeEprunt!: Date;
  public dateDemandeRetour!: Date;
  public dateDebutReservation!: Date;
  public dateFinReservation!: Date;

  public donneesReservation!: any;
  
  public listeMateriel: any;
  public listeLieuStockage: any;
  public messageValidationCreationCompte: any;
  public messageErreurValidationCreationCompte: any;


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
      "listeStatut": ["", [Validators.required]],
    }
  );

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private tokenIdentification: TokenIdentificationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.http.get("http://"+ environment.adresseServeur +"/liste-statut").subscribe(reponse => this.listeStatut = reponse); //permet de récupérer la liste depuis la BDD
    this.http.get("http://"+ environment.adresseServeur +"/liste-typeMateriels").subscribe(reponse => this.listeMateriel = reponse);
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/liste-lieuxStockage").subscribe(reponse => this.listeLieuStockage = reponse);

    this.tokenIdentification.raffraichirUtilisateur();

    this.tokenIdentification.utilisateur.subscribe( //Vérification token au chargement page
    utilisateur => {
        this.admin = utilisateur != null && utilisateur.droits.includes("ROLE_GESTIONNAIRE"); //Vérifie que l'utilisateur a bien role gestionnaire
        this.idUtilisateurConnecte = utilisateur.id;
      }
    );

    this.affichageDemandesPret();
    this.affichageRetoursPret();
    this.affichageProlongationPret();
    this.affichageNumeroSerie();

    this.affichageNombreDemandesPret();
    this.affichageNombreRetoursPret();
    this.affichageNombreProlongation();
    this.affichageNombreMaterielDefectueux();
    this.affichageNombreMaterielRetard();
    this.affichageNombreMaterielOperationnel();
  }

  //méthode pour envoyer les données du formulaire dans la BDD avec mdp hasher 
  donneesFormulaire():void {
      this.donnees = { nom: this.nomSaisie,prenom : this.prenomSaisie,motDePasse: this.mdpSaisie, mail: this.mailSaisie, adresse : this.adresseSaisie,ville : this.villeSaisie, codePostale: this.codePostalSaisie, numeroTelephone :this.telephoneSaisie, statut : {id: this.idStatut} } ;
      this.http.post("http://"+ environment.adresseServeur +"/donnees-CreationCompte", this.donnees, { responseType: 'text' })
      .subscribe((response) => {
        this.messageValidationCreationCompte = response;
      }, (error) => {
        this.messageErreurValidationCreationCompte = "Une erreur est survenue lors de la création du compte";
      }
      );
  } 


  closePopUpCreationCompte() {
    this.messageErreurValidationCreationCompte = '';
  }

  affichageDemandesPret(): void {
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/listeDemandesEmprunt").subscribe(reponse => this.listeDemandesEmprunt = reponse); //Récupére la liste des toutes les demandes d'emprunt en cours
  }

  affichageRetoursPret(): void {
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/listeRetoursEmprunt").subscribe(reponse => this.listeRetoursEmprunt = reponse); //Récupére la liste des toutes les demandes d'emprunt en cours
  }

  affichageProlongationPret(): void {
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/listeProlongationEmprunt").subscribe(reponse => this.listeProlongationEmprunt = reponse); //Récupére la liste des toutes les demandes d'emprunt en cours
  }

  affichageNombreDemandesPret(): void{
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/nombre-demandes-emprunt").subscribe((reponse:any) => this.nombreDemandesEmprunt = reponse); //Récupére le nombre de demandes d'emprunt en cours
  }

  affichageNombreRetoursPret(): void{
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/nombre-retours-emprunt").subscribe((reponse:any) => this.nombreRetoursEmprunt = reponse); //Récupére le nombre de demandes d'emprunt en cours
  }

  affichageNombreProlongation(): void{
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/nombre-prolongation-emprunt").subscribe((reponse:any) => this.nombreProlongationEmprunt = reponse); //Récupére le nombre de demandes d'emprunt en cours
  }

  affichageNombreMaterielDefectueux(): void{
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/nombre-materiels-defectueux").subscribe((reponse:any) => this.nombreMaterielDefectueux = reponse); //Récupére le nombre de demandes d'emprunt en cours
  }

  affichageNombreMaterielRetard(): void{
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/nombre-materiels-retard").subscribe((reponse:any) => this.nombreMaterielRetard = reponse); //Récupére le nombre de matériel emprunté en retard (non retourné)
  }

  affichageNombreMaterielOperationnel(): void{
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/nombre-materiels-operationnel").subscribe((reponse:any) => this.nombreMaterielOperationnel = reponse); //Récupére le nombre de matériel emprunté en retard (non retourné)
  }

  affichageNumeroSerie(): void{
    this.http.get("http://"+ environment.adresseServeur +"/gestionnaire/liste-materiel-numeroSerie").subscribe(reponse => this.listeNumeroSerieMateriel = reponse); //Récupére la liste des toutes les demandes d'emprunt en cours
  }

  validerDemandeEmprunt(idEmprunt: number){
    this.http.post("http://"+ environment.adresseServeur +"/gestionnaire/valider-demande-emprunt", {idEmprunt: idEmprunt},{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationDemandeEmprunt = reponse;
        this.affichageDemandesPret();
        this.affichageNombreDemandesPret();
      },
      (error) => {
        this.messageErreurValidationDemandeEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
    
  }

  supprimerDemandeEmprunt(idEmprunt: number){
    this.http.delete("http://"+ environment.adresseServeur +"/gestionnaire/supprimer-demande-emprunt/" + idEmprunt,{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationDemandeEmprunt = reponse;
        this.affichageDemandesPret();
        this.affichageNombreDemandesPret();
      },
      (error) => {
        this.messageErreurValidationDemandeEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
    
  }

  validerRetourEmprunt(idEmprunt: number){
    this.http.put("http://"+ environment.adresseServeur +"/gestionnaire/valider-retour-emprunt", {idEmprunt: idEmprunt},{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationRetourEmprunt = reponse;
        this.affichageRetoursPret();
        this.affichageNombreRetoursPret();
      },
      (error) => {
        this.messageErreurValidationRetourEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
  }

  supprimerDemandeRetour(idEmprunt: number){
    this.http.put("http://"+ environment.adresseServeur +"/gestionnaire/supprimer-retour-emprunt", {idEmprunt: idEmprunt}, {responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationRetourEmprunt = reponse;
        this.affichageRetoursPret();
        this.affichageNombreRetoursPret();
      },
      (error) => {
        this.messageErreurValidationRetourEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";

      }
    )
  }

  validerProlongationEmprunt(idEmprunt: number){
    this.http.put("http://"+ environment.adresseServeur +"/gestionnaire/valider-prolongation-emprunt", {idEmprunt: idEmprunt},{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationProlongationEmprunt = reponse;
        this.affichageProlongationPret();
        this.affichageNombreProlongation();
      },
      (error) => {
        this.messageErreurValidationProlongationEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
  }

  supprimerProlongationEmprunt(idEmprunt: number){
    this.http.put("http://"+ environment.adresseServeur +"/gestionnaire/supprimer-prolongation-emprunt", {idEmprunt: idEmprunt}, {responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationProlongationEmprunt = reponse;
        this.affichageProlongationPret();
        this.affichageNombreProlongation();
      },
      (error) => {
        this.messageErreurValidationProlongationEmprunt = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )
  }

  EnregistrerReservation(): void{ //Envoie demande emprunt
    this.donneesReservation = {materiel: {idMateriel: this.idNumeroMateriel}, dateEmprunt: this.dateDebutReservation, dateRetour: this.dateFinReservation, gestionnaire : {id : this.idUtilisateurConnecte }};
    console.log(this.donneesReservation);
    this.http.post("http://"+ environment.adresseServeur +"/demande-reservation", this.donneesReservation,{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationReservation = reponse;
      },
      (error) => {
        this.messageErreurReservation = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )

  }

  public cacherMessage(): void{
    this.messageValidationDemandeEmprunt = "";
    this.messageErreurValidationDemandeEmprunt = "";
    this.messageErreurValidationRetourEmprunt = "";
    this.messageValidationRetourEmprunt = "";
    this.messageErreurValidationProlongationEmprunt = "";
    this.messageValidationProlongationEmprunt = "";
    this.messageValidationReservation = "";
    this.messageErreurReservation = "";
  }
}
