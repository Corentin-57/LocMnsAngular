import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenIdentificationService } from 'src/app/token-identification.service';

@Component({
  selector: 'app-retour',
  templateUrl: './retour.component.html',
  styleUrls: ['./retour.component.scss']
})
export class RetourComponent implements OnInit {

  public listeNumSerieMateriels: any;
  private idUtilisateur!: number;

  constructor(
    public dialogRef: MatDialogRef<RetourComponent>,
    @Inject(MAT_DIALOG_DATA) public dataRetour: any,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private tokenIdentification: TokenIdentificationService
  ) { }

  ngOnInit(): void {
    this.tokenIdentification.raffraichirUtilisateur();
    this.tokenIdentification.utilisateur.subscribe(
      utilisateur =>{
        this.idUtilisateur = utilisateur.id

        this.http.get("http://localhost:8080/liste-materiels-utilisateur/" + this.idUtilisateur).subscribe(reponse => this.listeNumSerieMateriels = reponse); //Récupére la liste matériels des utilisateurs à chaque chargement du pop up
      }
    );
  }

  public formControl:FormGroup = this.formBuilder.group(
    {
      "numeroSerie": ["", [Validators.required]],
      "dateDemandeRetour": ["", [Validators.required]], //Lien des éléments avec le HTML
    }
  )

  onNoClick(): void {
    this.dialogRef.close();
  }

}
