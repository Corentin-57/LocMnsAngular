import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DysfonctionnementsComponent } from '../dialog/etudiant/dysfonctionnements/dysfonctionnements.component';
import { TokenIdentificationService } from '../token-identification.service';

@Component({
  selector: 'app-page-etudiant',
  templateUrl: './page-etudiant.component.html',
  styleUrls: ['./page-etudiant.component.scss']
})
export class PageEtudiantComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private tokenIdentification: TokenIdentificationService
  ) { }

  private descriptif: string = "";
  private dateDysfonctionnement!: Date;
  private donneesSaisies!: {};
  //private messageValidation!: string;
  private idUtilisateur!: number;
 
  ngOnInit(): void {
            this.tokenIdentification.raffraichirUtilisateur();
            this.tokenIdentification.utilisateur.subscribe(
              utilisateur =>{
                this.idUtilisateur = utilisateur.id
              }
          )
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DysfonctionnementsComponent, {
      width: '500px',
      data: {descriptif: this.descriptif, dateDysfonctionnement: this.dateDysfonctionnement, idUtilisateur : this.idUtilisateur},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.donneesSaisies = result;
    //   console.log(this.donneesSaisies);

    //   this.http.post('http://localhost:8080/saisir-dysfonctionnement', this.donneesSaisies)
    //   .subscribe((res) =>{
    //     console.log(res);
    //   });
    //     // .pipe(
    //     //   catchError(this.handleError('saisirDysfonctionnement', this.donneesSaisies))
    //     // );
    //   })

      dialogRef.afterClosed().subscribe(result => {
        this.donneesSaisies = result;
        console.log(this.donneesSaisies);

        // this.tokenIdentification.utilisateur.subscribe(
        //   utilisateur =>{
        //     this.idUtilisateur = utilisateur.id
        //   }

          //this.donneesSaisies = this.donneesSaisies.push({idUtilisateur: this.idUtilisateur })
        //)
  
          this.http.post('http://localhost:8080/saisir-dysfonctionnement', this.donneesSaisies,{responseType: 'text'} )
          .subscribe((res) =>{
            //this.messageValidation = res;
          });

          // .pipe(
          //   catchError(this.handleError('saisirDysfonctionnement', this.donneesSaisies))
          //);
        })

      


  }




}


