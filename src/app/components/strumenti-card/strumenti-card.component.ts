import { ListService } from './../../services/list.service';
import { Component, Input } from '@angular/core';
import { Iprodotto } from '../../Modules/iprodotto';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { LogSystemService } from '../../services/log-system.service';
import { IListItem } from '../../Modules/i-list-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strumenti-card',
  templateUrl: './strumenti-card.component.html',
  styleUrl: './strumenti-card.component.scss'
})
export class StrumentiCardComponent {
  @Input() prodotto!: Iprodotto;
  //Contiene le informazioni sull'utente attualmente loggato.
  loggedInUser: IutenteAuth | null = null;
  isLogged: boolean = false;
  userId!: number | undefined;
  //Contiene gli elementi presenti nella lista dei desideri dell'utente.
  listItems: IListItem[] | null = [];
  // Indica se il prodotto è attualmente nella lista dei desideri dell'utente.
  isInWishlist: boolean = false;

  constructor(
    private logService: LogSystemService,
    private listSvc: ListService,
    private router: Router
  ) {
    //Si sottoscrive all'observable utente$ del servizio logService per ottenere le informazioni sull'utente
    //loggato e aggiorna le variabili di stato di conseguenza.
    //Inizializza il servizio listSvc.
    this.logService.utente$.subscribe((user: IutenteAuth | null) => {
      this.loggedInUser = user;
      console.log("--------",user);
      this.userId = user?.obj.id;
      this.isLogged = !!user;
    });
    this.listSvc = listSvc; // Inizializza listSvc
  }
  //Aggiunge il prodotto corrente alla lista dei desideri dell'utente.
  //Controlla se l'utente è loggato e se il prodotto è già presente nella lista dei desideri prima di aggiungerlo.
  addToWishList(prodotto: Iprodotto): void {
    this.fetchlist();
    if (!this.loggedInUser || !this.loggedInUser.obj.id) {
      console.error('Utente non autorizzato');
      return;
    }
    if (!this.listItems) return;
    const isProductInWishlist = this.listItems.some(
      (item) => item.prodottoId === prodotto.id
    );

    if (!isProductInWishlist) {
      this.listSvc.addTolist(prodotto, Number(this.userId)); // Passa direttamente l'oggetto del prodotto
      console.log('Prodotto aggiunto alla lista dei desideri');
      this.isInWishlist = true;
    }
  }
  //Recupera la lista dei desideri dell'utente dal servizio listSvc.
  fetchlist() {
    if (!this.userId) return;
    this.listSvc.getlist().subscribe({
      next: (data: any) => {
        this.listItems = data;
      },
      error: (error: any) => {
        console.error('Errore nel recupero della lista dei desideri:', error);
      }
    });
  }
  //Verifica se il prodotto corrente è già presente nella lista dei desideri dell'utente.
  checkIfInWishlist(): void {
    if (!this.listItems) return;
    if (this.loggedInUser && this.loggedInUser.obj.id) {
      const isProductInWishlist = this.listItems.some(item => item.prodottoId === this.prodotto.id);
      this.isInWishlist = isProductInWishlist;
    }
  }
  //Apre un modulo per la creazione di una recensione per il prodotto specificato,
  //navigando verso la pagina crea-recensione e passando l'ID del prodotto come parametro.
  
  openReviewForm(productId: number) {
    this.prodotto.id = productId;
    // Ecco un esempio di navigazione verso un'altra pagina passando l'ID del prodotto come parametro
    this.router.navigate(['/crea-recensione', productId ]);
  }
}
