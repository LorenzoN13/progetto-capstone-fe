import { Iprodotto } from './../../../Modules/iprodotto';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecensioniService } from '../../../services/recensioni.service';
import { Irecensione } from '../../../Modules/irecensione';
import { LogSystemService } from '../../../services/log-system.service';
import { IutenteAuth } from '../../../Modules/iutente-auth';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crea-recensione',
  templateUrl: './crea-recensione.component.html',
  styleUrl: './crea-recensione.component.scss'
})
export class CreaRecensioneComponent implements OnInit{
  // Dichiarazione delle variabili di stato e delle dipendenze
isLogged: boolean = false; // Indica se l'utente è autenticato
@Input() prodottoId!: number; // Input per ricevere l'ID del prodotto
recensioneForm!: FormGroup; // FormGroup per gestire i dati della recensione
utenteId: number | undefined; // ID dell'utente
recensione: Irecensione = { // Oggetto per memorizzare i dati della recensione
  recensione: '',
  idUtente: 0,
  idProdotto: 0,
};
prodotto: Iprodotto | undefined; // Oggetto per memorizzare il prodotto selezionato

// Costruttore del componente, inietta i servizi e le dipendenze necessarie
constructor(
  private formBuilder: FormBuilder, // FormBuilder per creare il FormGroup
  private recensioneSvc: RecensioniService, // Servizio per gestire le recensioni
  private logService: LogSystemService, // Servizio per gestire il log del sistema
  private route: ActivatedRoute, // ActivatedRoute per accedere ai parametri dell'URL
  private router: Router // Router per la navigazione tra le pagine
) { }

// Metodo chiamato all'inizializzazione del componente
ngOnInit(): void {
  // Creazione del FormGroup per gestire i dati della recensione
  this.recensioneForm = this.formBuilder.group({
    recensione: ['', Validators.required]
  });

  // Sottoscrizione all'observable per ricevere gli aggiornamenti sull'utente autenticato
  this.logService.utente$.subscribe((user: IutenteAuth | null) => {
    // Verifica se l'utente è autenticato e se sono disponibili le informazioni sull'utente
    if (user && user.obj && user.obj.id) {
      this.isLogged = true; // Imposta lo stato di autenticazione a true
      this.utenteId = user.obj.id; // Memorizza l'ID dell'utente
      console.log('ID utente:', this.utenteId);
    } else {
      this.isLogged = false; // Imposta lo stato di autenticazione a false
      this.utenteId = undefined; // Resetta l'ID dell'utente
      console.log('ID utente non disponibile.');
    }
  });

  // Sottoscrizione all'observable per ricevere gli aggiornamenti sui parametri dell'URL
  this.route.params.subscribe(params => {
    // Recupera l'ID del prodotto dall'URL
    const idString = params['id'];
    if (idString !== null) {
      this.prodottoId = +idString; // Converte l'ID da stringa a numero e lo memorizza
      console.log('ID del prodotto recuperato:', this.prodottoId);
    } else {
      console.error('ID del prodotto non trovato nei parametri dell\'URL');
    }
  });
}

// Metodo per inviare la recensione
submitForm(): void {
  // Verifica se l'ID dell'utente è disponibile
  if (!this.utenteId) {
    console.error('ID utente non disponibile.');
    return; // Esce dalla funzione se l'ID dell'utente non è disponibile
  }

  // Verifica se l'ID del prodotto è disponibile
  if (!this.prodottoId) {
    console.error('ID del prodotto non disponibile.');
    return; // Esce dalla funzione se l'ID del prodotto non è disponibile
  }

  // Assegna l'ID dell'utente e dell'ID del prodotto alla recensione
  this.recensione.idUtente = this.utenteId;
  this.recensione.idProdotto = this.prodottoId;
  console.log('Dati della recensione da inviare:', this.recensione);

  // Invia la recensione al servizio e gestisce la risposta
  this.recensioneSvc.createRecensione(this.recensione).subscribe({
    next: (response: Irecensione) => {
      console.log('Recensione inviata con successo:', response);
      // Puoi fare ulteriori operazioni dopo aver ricevuto una risposta positiva dal backend
    },
    error: (error: any) => {
      console.error('Errore durante l\'invio della recensione:', error);
      // Gestisci l'errore adeguatamente, ad esempio mostrando un messaggio di errore all'utente
      if (error.status === 500) {
        alert('Si è verificato un errore durante l\'invio della recensione. Si prega di riprovare più tardi.');
      }
    }
  });

  // Naviga verso la pagina delle recensioni dopo aver inviato la recensione
  this.router.navigate(['/recensioni']);
}
}
