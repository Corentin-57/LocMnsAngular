import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PageEtudiantComponent } from './page-etudiant/page-etudiant.component';
import { FooterComponent } from './footer/footer.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ContactComponent } from './contact/contact.component';
import { PageGestionnaireComponent } from './page-gestionnaire/page-gestionnaire.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TokenInterceptor } from './token.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';


import { DysfonctionnementsComponent } from './dialog/etudiant/dysfonctionnements/dysfonctionnements.component';
import { ProlongationComponent } from './dialog/etudiant/prolongation/prolongation.component';
import { RetourComponent } from './dialog/etudiant/retour/retour.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    PageEtudiantComponent,
    FooterComponent,
    ConnexionComponent,
    ContactComponent,
    PageGestionnaireComponent,
    DysfonctionnementsComponent,
    ProlongationComponent,
    RetourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

