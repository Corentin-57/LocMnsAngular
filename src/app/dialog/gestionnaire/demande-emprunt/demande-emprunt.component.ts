import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenIdentificationService } from 'src/app/token-identification.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-demande-emprunt',
  templateUrl: './demande-emprunt.component.html',
  styleUrls: ['./demande-emprunt.component.scss']
})
export class DemandeEmpruntComponent implements OnInit {
  public listeNumSerieMateriels: any;
  private idUtilisateur!: number;

  constructor( 
    public dialogRef: MatDialogRef<DemandeEmpruntComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModificationDemandeEmprunt: any,
    private formBuilder: FormBuilder,
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

  this.http.get("http://" + environment.adresseServeur+ "/gestionnaire/liste-materiels").subscribe(reponse => this.listeNumSerieMateriels = reponse); 
  }

  public formControl:FormGroup = this.formBuilder.group(
    {
      "numeroSerie": ["", [Validators.required]],
    }
  )
  
onNoClick(): void {
    this.dialogRef.close();
}

}