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
  public contactForm1!:FormGroup;
  public contactForm2!:FormGroup;
  public contactForm3!:FormGroup;
  public statutUtilisateur = [ {name:"Etudiant"}, {name:"Intervenant"} ];
  public materiel = [ {name: "Ordinateur"}, {name: "Webcam"}, {name: "Projecteur"}, {name: "Casque VR"}];
  public lieu = [ {name: "MNS"}, {name: "IFA"} ];
  public cadreUtilisation = [ {name: "Cours"}, {name: "Salon professionnel"}, {name: "Réunion"}, {name: "Location longue"},];

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group( { statutUtilisateur: [null]});
    this.contactForm1 = this.formBuilder.group({ materiel: [null]});
    this.contactForm2 = this.formBuilder.group({ lieu: [null]});
    this.contactForm3 = this.formBuilder.group({ cadreUtilisation: [null]});
  }

  public donneesEtudiant(registerForm : NgForm) {
    console.log(registerForm.form);
    console.log('valeurs: ', JSON.stringify(registerForm.value));
    console.log('hello');
    console.log(this.contactForm.value)
  }

  submitListe() {
    console.log("FORM Submitted")
    console.log('valeurs liste déroulante: ', JSON.stringify(this.contactForm.value));
    console.log('valeurs liste déroulante: ', JSON.stringify(this.contactForm1.value));
    console.log(this.contactForm.value);
    console.log(this.contactForm1.value);
    console.log(this.contactForm2.value);
    console.log(this.contactForm3.value);

  }


}