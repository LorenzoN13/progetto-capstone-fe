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
  userId!: string | undefined;
  listItems: IListItem[] | null = [];
  isInWishlist: boolean = false;
  wishlistSvc: any;


  constructor(
    private logService: LogSystemService,
    private listSvc: ListService
  ) {
    this.logService.utente$.subscribe((user: IutenteAuth | null) => {
      this.loggedInUser = user;
      this.userId = user?.utente.id;
      this.isLogged = !!user;
    });
  }
  ngOnInit() {
    this.listSvc.wishlistItems.subscribe((items) => {
      this.listItems = items;
      console.log(this.listItems);
      this.checkIfInWishlist();
    });
    console.log(this.prodotto);
  }

  addToWishList(prodottoId: number): void {
    this.fetchWishlist();
    if (!this.loggedInUser || !this.loggedInUser.utente.id) {
      console.error('Utente non autorizzato');
      return;
    }
    if (!this.listItems) return;
    const isProductInWishlist = this.listItems.some(
      (item) => item.prodottoId === prodottoId
    );

    if (isProductInWishlist) {
      const existingWishlistItem = this.listItems.find(
        (item) => item.prodottoId === prodottoId
      );
    } else {
      this.wishlistSvc
        .addToWishList(prodottoId, String(this.userId))
        .subscribe((data: any) => {
          console.log('Birra aggiunta alla lista dei desideri:', data);
        });
        this.isInWishlist = true;
    }
    this.fetchWishlist();
  }

  fetchWishlist() {
    this.wishlistSvc.getWishlist(String(this.userId)).subscribe({
      next: (data: any) => {
        this.listItems = data;
      },
      error: (error: any) => {
        console.error('Errore nel recupero della lista dei desideri:', error);
      },
    });
  }

  checkIfInWishlist(): void {
    if (!this.listItems) return;
    if (this.loggedInUser && this.loggedInUser.utente.id) {
      const isProductInWishlist = this.listItems.some(item => item.prodottoId === this.prodotto.id);
      this.isInWishlist = isProductInWishlist;
    }
  }
}
