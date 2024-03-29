import { Component, OnInit } from '@angular/core';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { LogSystemService } from '../../services/log-system.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
isLogged = false; // Indica se l'utente è autenticato
user!: IutenteAuth; // Contiene le informazioni sull'utente autenticato
toggle: boolean = true; // Variabile di flag per un comportamento toggle
admin: boolean = false; // Indica se l'utente è un amministratore

constructor(
  private LSS: LogSystemService, // Servizio per il logging del sistema
) {}

// Metodo chiamato all'inizializzazione del componente
ngOnInit() {
  // Sottoscrizione all'observable dell'utente nel servizio di log del sistema
  this.LSS.utente$.subscribe((user: IutenteAuth | null) => {
    // Impostazione dello stato di autenticazione in base alla presenza di un utente
    this.isLogged = !!user; // Converte il valore di 'user' in un booleano (true se 'user' è definito, false altrimenti)
    this.user = user!; // 'user' viene assegnato a 'this.user', garantendo che 'user' non sia null o undefined
  });
}
}
