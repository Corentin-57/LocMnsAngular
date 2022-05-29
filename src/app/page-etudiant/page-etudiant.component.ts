import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DysfonctionnementsComponent } from '../dialog/etudiant/dysfonctionnements/dysfonctionnements.component';
import { ProlongationComponent } from '../dialog/etudiant/prolongation/prolongation.component';
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

  private idMateriel!: number;  
  private idUtilisateur!: number;
  private donneesSaisies!: {};

  public errorMessage!: string;
  public successMessage!: string;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private tokenIdentification: TokenIdentificationService
  ) { }

  ngOnInit(): void {
            this.tokenIdentification.raffraichirUtilisateur();
            this.tokenIdentification.utilisateur.subscribe(
              utilisateur =>{
                this.idUtilisateur = utilisateur.id
              }
          ); 
  }

  openDialogDysfonctionnement(): void {
    const dialogRef = this.dialog.open(DysfonctionnementsComponent, {
      width: '500px',
      data: {descriptif: this.descriptif, dateDysfonctionnement: this.dateDysfonctionnement, utilisateur : {id : this.idUtilisateur}, materiel: {idMateriel: this.idMateriel}},
    });

      dialogRef.afterClosed().subscribe(result => {
        this.donneesSaisies = result;

          if(this.donneesSaisies != undefined){ //N'effectue pas la requête si l'objet est vide (en cas d'annulation)
            this.http.post('http://localhost:8080/saisir-dysfonctionnement', this.donneesSaisies,{responseType: 'text'} )
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
        console.log(result);
          if(this.donneesSaisies != undefined){ //N'effectue pas la requête si l'objet est vide (en cas d'annulation)
            this.http.post('http://localhost:8080/demande-prolongation', this.donneesSaisies,{responseType: 'text'} )
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
  }
          

}


