import { Component } from '@angular/core';
import { Irecensione } from '../../Modules/irecensione';
import { RecensioniService } from '../../services/recensioni.service';


@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrl: './recensioni.component.scss'
})
export class RecensioniComponent {
  recensioni: Irecensione[] = []; // Inizializza un array vuoto di recensioni

  constructor(
    private RecensioniSvc: RecensioniService, // Inietta il servizio per le recensioni nel componente
  ) {}

  ngOnInit(): void {
    this.fetchRecensioni(); // Al momento dell'inizializzazione del componente, richiama il metodo per recuperare le recensioni
  }

  fetchRecensioni(): void {
    // Metodo per recuperare le recensioni dal servizio
    this.RecensioniSvc.getRecensioni().subscribe({
      // Sottoscrive all'observable restituito dal metodo getRecensioni del servizio
      next: (response: any) => {
        // Gestisce la risposta ricevuta dal servizio
        if (response && response.obj && response.obj.content) {
          // Se la risposta è valida e contiene i dati delle recensioni
          this.recensioni = response.obj.content; // Aggiorna l'array di recensioni con i dati ricevuti
        } else {
          console.error('Struttura dati non valida nella risposta del server.'); // Log dell'errore nel caso la risposta non sia valida
        }
      },
      error: (error) => {
        // Gestisce eventuali errori durante il recupero delle recensioni
        console.error('Errore nel recupero della recensione:', error); // Log dell'errore
      }
    });
  }
}

