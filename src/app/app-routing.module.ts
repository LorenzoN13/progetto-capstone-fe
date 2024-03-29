import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecensioniComponent } from './components/recensioni/recensioni.component';
import { DetailsComponent } from './pages/details/details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LogGuard } from './pages/log-system/log.guard';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { Pages404Component } from './pages/pages404/pages404.component';
import { ListComponent } from './pages/list/list.component';
import { CreaRecensioneComponent } from './components/recensioni/crea-recensione/crea-recensione.component';
import { SpedizioniComponent } from './components/spedizioni/spedizioni.component';
import { ServizioclientiComponent } from './components/servizioclienti/servizioclienti.component';
import { ResierimborsiComponent } from './components/resierimborsi/resierimborsi.component';


// Definizione delle rotte dell'applicazione
const routes: Routes = [
  // Carica il modulo LogSystemModule in modo lazy quando si accede a '/LogSystem'
  { path: 'LogSystem', loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) },
  // Reindirizza automaticamente alla rotta '/home' quando la URL è vuota
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  // Rotta per la pagina principale (HomeComponent)
  { path: 'home', component: HomeComponent },
  // Rotta per la visualizzazione delle recensioni (RecensioniComponent)
  { path: 'recensioni', component: RecensioniComponent },
  // Rotta per i dettagli di un elemento specifico (DetailsComponent)
  { path: 'details/:id', component: DetailsComponent },
  // Rotta per la gestione delle spedizioni (SpedizioniComponent)
  { path: 'spedizioni', component: SpedizioniComponent },
  // Rotta per il profilo utente (UserProfileComponent) che richiede l'autenticazione
  { path: 'userprofile', component: UserProfileComponent, canActivate: [LogGuard] },
  // Rotta per la creazione di una recensione per un elemento specifico (CreaRecensioneComponent) che richiede l'autenticazione
  { path: 'crea-recensione/:id', component: CreaRecensioneComponent, canActivate: [LogGuard] },
  // Rotte per i servizi clienti e i rimborsi (ServizioclientiComponent, ResierimborsiComponent)
  { path: 'servizioclienti', component: ServizioclientiComponent },
  { path: 'resierimborsi', component: ResierimborsiComponent },
  // Rotte per la visualizzazione e la modifica degli elementi (ListComponent, EditComponent, CreateComponent) che richiedono l'autenticazione
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent, canActivate: [LogGuard] },
  { path: 'create', component: CreateComponent, canActivate: [LogGuard] },
  // Rotta per gestire qualsiasi altro percorso non definito (Pages404Component)
  { path: '**', component: Pages404Component },
];

@NgModule({
  // Imposta le rotte principali dell'applicazione
  imports: [RouterModule.forRoot(routes)],
  // Esporta il RouterModule per l'utilizzo nelle altre parti dell'applicazione
  exports: [RouterModule]
})
export class AppRoutingModule { }
