import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecensioniComponent } from './components/recensioni/recensioni.component';
import { DetailsComponent } from './pages/details/details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BancomatComponent } from './components/payment/bancomat/bancomat.component';
import { TransferComponent } from './components/payment/transfer/transfer.component';
import { ValutazioniComponent } from './components/valutazioni/valutazioni.component';
import { LogGuard } from './pages/log-system/log.guard';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { Pages404Component } from './pages/pages404/pages404.component';
import { ListComponent } from './pages/list/list.component';
import { CreaRecensioneComponent } from './components/recensioni/crea-recensione/crea-recensione.component';

const routes: Routes = [
  { path: 'LogSystem',loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) },
  { path: '', pathMatch:'full', redirectTo:'/home' },
  { path: 'home', component: HomeComponent },
  { path: 'recensioni', component: RecensioniComponent,children:[] },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'userprofile', component: UserProfileComponent, canActivate:[LogGuard]},
  { path: 'valutazioni', component: ValutazioniComponent},
  { path: 'crea-recensione/:id', component: CreaRecensioneComponent, canActivate:[LogGuard]}, // }
  { path: 'crea-valutazione/:id', component: CreaRecensioneComponent, canActivate:[LogGuard]},
  { path: 'payment', component: PaymentComponent,
  children:[
    { path: 'bancomat', component: BancomatComponent},
    { path: 'transfer', component: TransferComponent},
    { path: '', redirectTo: 'bancomat', pathMatch: 'full' }
  ],
  canActivate:[LogGuard]},
  { path: 'edit/:id', component: EditComponent ,canActivate:[LogGuard]},
  { path: 'create', component: CreateComponent ,canActivate:[LogGuard]},
  { path: '**', component:Pages404Component},
  { path: 'list', component: ListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
