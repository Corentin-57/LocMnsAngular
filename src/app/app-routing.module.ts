import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ContactComponent } from './contact/contact.component';
import { PageEtudiantComponent } from './page-etudiant/page-etudiant.component';
import { PageGestionnaireComponent } from './page-gestionnaire/page-gestionnaire.component';

const routes: Routes = [ //Définir les differentes routes pour accéder aux composants
{path: "", component: AccueilComponent}, //Lancement app envoie sur page accueil
{path: "accueil", component: AccueilComponent},
{path: "page-etudiant", component: PageEtudiantComponent},
{path: "page-gestionnaire", component: PageGestionnaireComponent},
{path: "contact", component: ContactComponent},
{path: "connexion", component: ConnexionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
