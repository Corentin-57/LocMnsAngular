import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DysfonctionnementsComponent } from '../dialog/etudiant/dysfonctionnements/dysfonctionnements.component';
import { ProlongationComponent } from '../dialog/etudiant/prolongation/prolongation.component';
import { RetourComponent } from '../dialog/etudiant/retour/retour.component';
import { TokenIdentificationService } from '../token-identification.service';

@Component({
  selector: 'app-page-etudiant',
  templateUrl: './page-etudiant.component.html',
  styleUrls: ['./page-etudiant.component.scss']
})
export class PageEtudiantComponent implements OnInit {

  private descriptif: string = "";
  private dateDysfonctionnement!: Date;  

  private dateProlongation!: Date;

  private dateDemandeRetour!: Date;

  private idMateriel!: number;  
  private idUtilisateur!: number;
  private donneesSaisies!: {};

  public errorMessage!: string;
  public successMessage!: string;

  public messageValidationRequete!: string;
  public messageErreurRequete!: string;

  public donneesDemandeMateriel!:any;
  public listeTypesMateriel: any;
  public idTypeMateriel!: number;

  public listeModeles!: any;
  public idModele!: number;

  public listeCadresUtilisation!: any;
  public idCadreUtilisation!: number;

  public dateDebutEmprunt!: Date;
  public dateFinEmprunt!: Date;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private tokenIdentification: TokenIdentificationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
            this.tokenIdentification.raffraichirUtilisateur();
            this.tokenIdentification.utilisateur.subscribe(
              utilisateur =>{
                this.idUtilisateur = utilisateur.id
              }
          ); 
          this.http.get("http://" + environment.adresseServeur + "/liste-typeMateriels").subscribe(reponse => this.listeTypesMateriel = reponse); //Récupére la liste des types de matériel

          this.http.get("http://" + environment.adresseServeur +"/liste-modeles").subscribe(reponse => this.listeModeles = reponse); //Récupére la liste des modèles
          
          this.http.get("http://"+ environment.adresseServeur +"/liste-cadres-utilisation").subscribe(reponse => this.listeCadresUtilisation = reponse); //Récupére la liste des cadres d'utilisation
          
  }

  openDialogDysfonctionnement(): void {
    const dialogRef = this.dialog.open(DysfonctionnementsComponent, {
      width: '500px',
      data: {descriptif: this.descriptif, dateDysfonctionnement: this.dateDysfonctionnement, utilisateur : {id : this.idUtilisateur}, materiel: {idMateriel: this.idMateriel}},
    });

      dialogRef.afterClosed().subscribe(result => {
        this.donneesSaisies = result;
        console.log(this.donneesSaisies);

          if(this.donneesSaisies != undefined){ //N'effectue pas la requête si l'objet est vide (en cas d'annulation)
            this.http.post("http://"+ environment.adresseServeur +"/saisir-dysfonctionnement", this.donneesSaisies,{responseType: 'text'} )
              .subscribe(
                (reponse) => {
                  this.successMessage = reponse;
                },
                (error) => {
                  this.errorMessage = "Une erreur est survenue, veuillez réessayer plus tard";
                }
              )
          }
        })  
  }


  openDialogProlongation(): void {
    const dialogRef = this.dialog.open(ProlongationComponent, {
      width: '500px',
      data: {dateProlongation: this.dateProlongation, utilisateur : {id : this.idUtilisateur}, materiel: {idMateriel: this.idMateriel}},
    });

      dialogRef.afterClosed().subscribe(result => {
        this.donneesSaisies = result;

          if(this.donneesSaisies != undefined){ //N'effectue pas la requête si l'objet est vide (en cas d'annulation)
            this.http.post("http://" + environment.adresseServeur + "/demande-prolongation", this.donneesSaisies,{responseType: 'text'} )
              .subscribe(
                (reponse) => {
                  this.successMessage = reponse;
                },
                (error) => {
                  this.errorMessage = "Une erreur est survenue, veuillez réessayer plus tard";
                }
              )
          }
        })  
  }

  openDialogRetour(): void {
    const dialogRef = this.dialog.open(RetourComponent, {
      width: '500px',
      data: {dateDemandeRetour: this.dateDemandeRetour, utilisateur : {id : this.idUtilisateur}, materiel: {idMateriel: this.idMateriel}},
    });

      dialogRef.afterClosed().subscribe(result => {
        this.donneesSaisies = result;
          if(this.donneesSaisies != undefined){ //N'effectue pas la requête si l'objet est vide (en cas d'annulation)
            this.http.post("http://"+ environment.adresseServeur +"/demande-retour", this.donneesSaisies,{responseType: 'text'} )
              .subscribe(
                (reponse) => {
                  this.successMessage = reponse;
                },
                (error) => {
                  this.errorMessage = "Une erreur est survenue, veuillez réessayer plus tard";
                }
              )
          }
        })  
  }

  public cacherMessage(): void{
    this.errorMessage = "";
    this.successMessage = "";
    this.messageErreurRequete = "";
    this.messageValidationRequete = "";
  }

  public formControl:FormGroup = this.formBuilder.group(
    {
      "typeMateriel": ["", [Validators.required]],
      "modele": ["", [Validators.required]],
      "cadreUtilisation": ["", [Validators.required]],
      "datesEmprunt" : ["", [Validators.required]],
    }
  )

  envoyerFormulaire(): void{ //Envoie demande emprunt
    this.donneesDemandeMateriel = {typeMateriel: {idType: this.idTypeMateriel}, materiel: {modele: {idModele: this.idModele}}, cadreUtilisation: {idCadre: this.idCadreUtilisation}, dateEmprunt: this.dateDebutEmprunt + " 00:00:00", dateRetour: this.dateFinEmprunt + " 00:00:00", utilisateur : {id : this.idUtilisateur}, contient: {idCadre: this.idCadreUtilisation} };

    this.http.post("http://" + environment.adresseServeur + "/demande-emprunt", this.donneesDemandeMateriel,{responseType: 'text'} )
    .subscribe(
      (reponse) => {
        this.messageValidationRequete = reponse;
      },
      (error) => {
        this.messageErreurRequete = "Une erreur est survenue, veuillez réessayer plus tard";
      }
    )

  }
          

}


