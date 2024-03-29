import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Definizione delle routes dell'applicazione
const routes: Routes = [
  {
    path: '', // Percorso radice dell'applicazione
    pathMatch:'full', // Indica che il percorso corrisponde esattamente alla radice
    redirectTo: '/LogSystem/login', // Reindirizzamento alla pagina di login se il percorso è vuoto
  },
  {
    path:"login", // Percorso per la pagina di login
    component: LoginComponent, // Componente associato alla pagina di login
  },
  {
    path:"register", // Percorso per la pagina di registrazione
    component:RegisterComponent // Componente associato alla pagina di registrazione
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogSystemRoutingModule { }
