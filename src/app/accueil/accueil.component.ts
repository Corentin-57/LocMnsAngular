import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  cheminPhotoOrdi:any = "assets/ordinateur.jpg"

  cheminCasqueVR:any = "assets/casqueVR.jpg"

  cheminWebcam: any = "assets/webcam.jpg"

  cheminProjecteur: any = "assets/projecteur.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}
