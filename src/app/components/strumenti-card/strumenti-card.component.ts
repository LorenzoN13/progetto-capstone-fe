import { ListService } from './../../services/list.service';
import { Component, Input } from '@angular/core';
import { Iprodotto } from '../../Modules/iprodotto';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { LogSystemService } from '../../services/log-system.service';
import { IListItem } from '../../Modules/i-list-item';

@Component({
  selector: 'app-strumenti-card',
  templateUrl: './strumenti-card.component.html',
  styleUrl: './strumenti-card.component.scss'
})
export class StrumentiCardComponent {
  @Input() prodotto!: Iprodotto;
  loggedInUser: IutenteAuth | null = null;
  isLogged: boolean = false;
  userId!: number | undefined;
  listItems: IListItem[] | null = [];
  isInWishlist: boolean = false;

  constructor(
    private logService: LogSystemService,
    private listSvc: ListService
  ) {
    this.logService.utente$.subscribe((user: IutenteAuth | null) => {
      this.loggedInUser = user;
      this.userId = user?.obj.id;
      this.isLogged = !!user;
    });
    this.listSvc = listSvc; // Inizializza wishlistSvc con listSvc
  }

  ngOnInit() {
    this.listSvc.wishlistItems.subscribe((items) => {
      this.listItems = items;
      this.checkIfInWishlist();
    });
  }

  addToWishList(prodottoId: number): void {
    this.fetchWishlist();
    if (!this.loggedInUser || !this.loggedInUser.obj.id) {
      console.error('Utente non autorizzato');
      return;
    }
    if (!this.listItems) return;
    const isProductInWishlist = this.listItems.some(
      (item) => item.prodottoId === prodottoId
    );

    if (!isProductInWishlist) {
      this.listSvc.addToWishlist(prodottoId, Number(this.userId));
      console.log('Prodotto aggiunto alla lista dei desideri');
      this.isInWishlist = true;
    }
  }

  fetchWishlist() {
    if (!this.userId) return;
    this.listSvc.getWishlist().subscribe({
      next: (data: any) => {
        this.listItems = data;
      },
      error: (error: any) => {
        console.error('Errore nel recupero della lista dei desideri:', error);
      }
    });
  }

  checkIfInWishlist(): void {
    if (!this.listItems) return;
    if (this.loggedInUser && this.loggedInUser.obj.id) {
      const isProductInWishlist = this.listItems.some(item => item.prodottoId === this.prodotto.id);
      this.isInWishlist = isProductInWishlist;
    }
  }
}
