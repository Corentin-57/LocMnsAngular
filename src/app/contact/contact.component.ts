import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactMns:any = "assets/contact/mns.png";
  contactMapMns:any = "assets/contact/mapMns.png";
  contactIfa:any = "assets/contact/ifa.png";
  contactMapIfa:any = "assets/contact/mapIfa.png";
  contactLogoMns:any = "assets/contact/logo_mns.png";
  contactLogoIfa:any = "assets/contact/logo_IFA.png";

  constructor() { }

  ngOnInit(): void {
  }

}
