import { ProdottiService } from './../../services/prodotti.service';
import { Component, OnInit } from '@angular/core';
import { Iprodotto } from '../../Modules/iprodotto';
import { LogSystemService } from '../../services/log-system.service';
import { PaginatorService } from '../../services/paginator.service';
import { IutenteAuth } from '../../Modules/iutente-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  prodotti: Iprodotto[] = []; // Array di prodotti da visualizzare nella pagina corrente
allProdotti: Iprodotto[] = []; // Array di tutti i prodotti ottenuti dal server
islogged: boolean = false; // Flag che indica se l'utente è loggato o meno
utenteId: number | undefined; // ID dell'utente loggato
currentPage: number = 1; // Pagina corrente della paginazione
itemsPerPage: number = 25; // Numero di elementi da visualizzare per pagina

constructor(
  private prodottiService: ProdottiService, // Servizio per ottenere i prodotti dal server
  private paginatorService: PaginatorService, // Servizio per gestire la paginazione
  private logService: LogSystemService, // Servizio per gestire il login dell'utente
) {}

ngOnInit(): void {
  // Sottoscrizione all'observable per controllare lo stato di login dell'utente
  this.logService.utente$.subscribe((user: IutenteAuth | null) => {
    // Se l'utente è loggato, imposta il flag islogged a true e assegna l'ID dell'utente
    if (user && user.obj && user.obj.id) {
      this.islogged = true;
      this.utenteId = user.obj.id;
    } else {
      // Se l'utente non è loggato, imposta il flag islogged a false e l'ID dell'utente a undefined
      this.islogged = false;
      this.utenteId = undefined;
    }
  });
  // Ottieni i prodotti dal server all'inizio
  this.fetchProdotti();
}

// Metodo per recuperare i prodotti dal server
fetchProdotti(): void {
  this.prodottiService.getProdotti().subscribe({
    next: (response: any) => {
      if (response && response.obj && response.obj.content) {
        // Assegna i prodotti ottenuti dalla risposta del server e aggiorna la paginazione
        this.prodotti = response.obj.content;
        this.updatePage();
        // Assegna tutti i prodotti ottenuti dal server all'array allProdotti per utilizzarli nella ricerca
        this.allProdotti = response.obj.content;
      } else {
        console.error('Struttura dati non valida nella risposta del server.');
      }
    },
    error: (error) => {
      console.error('Errore nel recupero dei prodotti:', error);
    }
  });
}

// Metodo per aggiornare la pagina corrente della paginazione
updatePage(): void {
  this.prodotti = this.paginatorService.paginate(this.prodotti, this.currentPage, this.itemsPerPage);
}

// Metodo chiamato quando viene cambiata la pagina della paginazione
onPageChange(page: number): void {
  this.currentPage = page;
  this.updatePage();
}

// Metodo per cercare i prodotti per nome
searchProdottiByName(nome: string): void {
  if (!nome) {
    // Se il campo di ricerca è vuoto, visualizza tutti i prodotti
    this.prodotti = this.allProdotti.slice();
  } else {
    // Altrimenti, filtra i prodotti per il nome specificato
    this.prodotti = this.allProdotti.filter((prodotto: Iprodotto) =>
      prodotto.titolo.toLowerCase().includes(nome.toLowerCase())
    );
  }
  this.updatePage(); // Aggiorna la paginazione dopo la ricerca
}

// Metodo chiamato quando viene emesso l'evento di ricerca per nome
handleBeerNameEvent(nome: string): void {
  // Imposta il nome del prodotto nel servizio prodotti per utilizzarlo in altre componenti
  this.prodottiService.setProdottoName(nome);
  this.updatePage(); // Aggiorna la paginazione dopo aver impostato il nome del prodotto
}
}
