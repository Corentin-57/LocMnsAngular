import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenIdentificationService } from 'src/app/token-identification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dysfonctionnements',
  templateUrl: './dysfonctionnements.component.html',
  styleUrls: ['./dysfonctionnements.component.scss']
})
export class DysfonctionnementsComponent implements OnInit {

  public listeNumSerieMateriels: any;
  private idUtilisateur!: number;

  constructor( 
    public dialogRef: MatDialogRef<DysfonctionnementsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDysfonctionnement: any,
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

  this.http.get("http://" + environment.adresseServeur+ "/liste-materiels-utilisateur/" + this.idUtilisateur).subscribe(reponse => this.listeNumSerieMateriels = reponse); //Récupére la liste matériels des utilisateurs à chaque chargement du pop up
  }

  public formControl:FormGroup = this.formBuilder.group(
    {
      "numeroSerie": ["", [Validators.required]],
      "dateDysfonctionnement": ["", [Validators.required]], //Lien des éléments avec le HTML
      "descriptif": ["", [Validators.required]] //Mettre le même nom que le champ sous Spring
    }
  )
  
onNoClick(): void {
    this.dialogRef.close();
}



}


