import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenIdenticationService } from '../token-identication.service';

@Component({
  selector: 'app-page-gestionnaire',
  templateUrl: './page-gestionnaire.component.html',
  styleUrls: ['./page-gestionnaire.component.scss']
})
export class PageGestionnaireComponent implements OnInit {

  public listeUtilisateur: any;

  public admin: boolean = false;

  constructor(
    private client: HttpClient,
    private tokenIdentification: TokenIdenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

}
