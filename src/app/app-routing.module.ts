import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { PageEtudiantComponent } from './page-etudiant/page-etudiant.component';

const routes: Routes = [ //Définir les differente routes pour accéder aux composants
{path: "accueil", component: AccueilComponent},
{path: "page-etudiant", component: PageEtudiantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
