import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dysfonctionnements',
  templateUrl: './dysfonctionnements.component.html',
  styleUrls: ['./dysfonctionnements.component.scss']
})
export class DysfonctionnementsComponent implements OnInit {

  public formControl:FormGroup = this.formBuilder.group(
    {
      "dateDysfonctionnement": ["", [Validators.required]], //Lien des éléments avec le HTML
      "descriptif": ["", [Validators.required]] //Mettre le même nom que le champ sous Spring
    }
  )

  constructor( public dialogRef: MatDialogRef<DysfonctionnementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
  }
  
onNoClick(): void {
    this.dialogRef.close();
}


}


