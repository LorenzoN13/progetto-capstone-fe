import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogSystemRoutingModule } from './log-system-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogSystemComponent } from './log-system.component';


@NgModule({
  // Dichiara i componenti che appartengono a questo modulo
  declarations: [
    LogSystemComponent,
    RegisterComponent,
    LoginComponent
  ],
  // Importa altri moduli necessari per questo modulo
  imports: [
    CommonModule, // Modulo di base di Angular che fornisce le direttive come ngIf, ngFor, ecc.
    HttpClientModule, // Modulo per le richieste HTTP al server
    ReactiveFormsModule, // Modulo per la creazione e la gestione di form reattive
    LogSystemRoutingModule // Modulo di routing specifico per il sistema di gestione dell'accesso
  ]
})
export class LogSystemModule { } // Esporta il modulo LogSystemModule
