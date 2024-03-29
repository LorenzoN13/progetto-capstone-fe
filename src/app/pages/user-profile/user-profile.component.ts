import { Component } from '@angular/core';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { Iutente } from '../../Modules/iutente';
import { LogSystemService } from '../../services/log-system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl:'./user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  // Definizione delle variabili di classe
userAuth!: IutenteAuth | null; // Dati di autenticazione dell'utente
user!: Iutente; // Informazioni sull'utente
deletingName!: string; // Nome inserito per confermare l'eliminazione dell'account
deleting!: boolean; // Flag per indicare se si è attivato il processo di eliminazione dell'account
wrongName!: boolean; // Flag per indicare se il nome inserito per l'eliminazione è errato
editMode!: boolean; // Flag per indicare se si è in modalità di modifica del profilo
adminSwitch!: boolean; // Flag per indicare se l'utente ha il ruolo di amministratore

constructor(
  private LSS: LogSystemService, // Servizio per gestire la sessione utente
) {
  // Sottoscrizione agli aggiornamenti dell'utente autenticato
  this.LSS.utente$.subscribe(userAuth => {
    this.userAuth = userAuth; // Aggiornamento dei dati di autenticazione
    if (this.userAuth) {
      this.user = this.userAuth.obj; // Recupero delle informazioni sull'utente
      console.log('Dati utente:', this.user); // Stampa delle informazioni utente per debug
    }
  });
}

// Metodo per attivare il processo di eliminazione dell'account utente
deleteAccount() {
  this.deleting = true; // Impostazione del flag di eliminazione su true
}

// Metodo per effettuare il logout dell'utente
logOut() {
  this.LSS.logOut(); // Chiamata al metodo del servizio per effettuare il logout
}

// Metodo per confermare l'eliminazione dell'account utente
confirmDelete() {
  // Controllo se il nome inserito per l'eliminazione corrisponde al nome dell'utente
  if (this.deletingName === this.user?.nome) {
    const token = this.userAuth?.token; // Recupero del token di autenticazione
    if (token) {
      // Chiamata al servizio per eliminare l'account utente
      this.LSS.deleteAccount(this.user.id, token).subscribe({
        next: () => {
          // Gestione della risposta positiva
          // Messaggio di conferma e logout dell'utente dopo l'eliminazione dell'account
        },
        error: (error) => {
          // Gestione degli errori durante l'eliminazione dell'account
        }
      });
    } else {
      // Gestione del caso in cui il token non è presente o non valido
    }
  } else {
    // Il nome inserito per l'eliminazione non corrisponde al nome dell'utente
    this.wrongName = true; // Impostazione del flag per segnalare l'errore nel nome
  }
}

// Metodo per annullare il processo di eliminazione dell'account utente
cancelDelete() {
  this.deleting = false; // Impostazione del flag di eliminazione su false
}
}
