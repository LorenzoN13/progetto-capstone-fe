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

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'/home' },
  { path: 'home', component: HomeComponent },
  { path: 'recensioni', component: RecensioniComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'userprofile', component: UserProfileComponent, canActivate:[LogGuard]},
  { path: 'valutazioni', component: ValutazioniComponent}
  { path: 'payment', component: PaymentComponent,
  children:[
    { path: 'bancomat', component: BancomatComponent},
    { path: 'transfer', component: TransferComponent},
    { path: '', redirectTo: 'bancomat', pathMatch: 'full' }
  ],
  canActivate:[LogGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
