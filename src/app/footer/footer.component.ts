import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  logoSite:any = "assets/footer/logo.svg";
  logoIfa:any = "assets/footer/ifa.png";
  logoFb:any = "assets/footer/facebook.png";
  logoYt:any = "assets/footer/youtube.png";
  logoLinkedin:any = "assets/footer/linkedin.png";
  logoInsta:any = "assets/footer/instagram.png";

  constructor() { }

  ngOnInit(): void {
  }

}
