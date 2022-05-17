import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PageGestionnaireComponent } from './page-gestionnaire/page-gestionnaire.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContactComponent,
    ConnexionComponent,
    PageGestionnaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
