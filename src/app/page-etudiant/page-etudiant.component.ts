import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Etudiant } from './etudiant';

@Component({
  selector: 'app-page-etudiant',
  templateUrl: './page-etudiant.component.html',
  styleUrls: ['./page-etudiant.component.scss']
})
export class PageEtudiantComponent implements OnInit {

  public etudiant: Etudiant = new Etudiant();

  public contactForm!:FormGroup;
  public statutUtilisateur = [{id: 1, name:"etudiant"}, {id:2, name:"intervenant"}];

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({ statutUtilisateur: [null]});
  }

  public donneesEtudiant(resgisterForm : NgForm) {
    console.log(resgisterForm.form);
    console.log('valeurs: ', JSON.stringify(resgisterForm.value));
    console.log('hello');
    console.log(this.contactForm.value)
  }

  subbmitListe() {
    console.log("FORM Submitted")
    console.log('valeurs liste déroulante: ', JSON.stringify(this.contactForm.value));
    console.log(this.contactForm.value)
  }

  

 

}