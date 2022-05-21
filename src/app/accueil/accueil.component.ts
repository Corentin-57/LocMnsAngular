import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  cheminPhotoOrdi:any = "assets/accueil/ordinateur.jpg"

  cheminCasqueVR:any = "assets/accueil/casqueVR.jpg"

  cheminWebcam: any = "assets/accueil/webcam.jpg"

  cheminProjecteur: any = "assets/accueil/projecteur.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
