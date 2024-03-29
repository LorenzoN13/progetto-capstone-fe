import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IListItem } from '../Modules/i-list-item';
import { Iprodotto } from '../Modules/iprodotto';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listKey = 'listItems';

  listItems: BehaviorSubject<IListItem[]> = new BehaviorSubject<IListItem[]>(this.getlistFromLocalStorage());

  constructor() {}

  private getlistFromLocalStorage(): IListItem[] {
    const storedWishlist = localStorage.getItem(this.listKey);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  updatelistInLocalStorage(items: IListItem[]): void {
    localStorage.setItem(this.listKey, JSON.stringify(items));
  }

  getlist(): Observable<IListItem[]> {
    return this.listItems.asObservable();
  }

  addTolist(prodotto: Iprodotto, utenteId: number): void {
    const items = this.listItems.value;
    // Verifica se il prodotto è già presente nella lista
    if (!items.find(item => item.prodottoId === prodotto.id)) {
      const listItem: IListItem = {
        id: items.length + 1, // Assegna un nuovo ID univoco
        prodottoId: prodotto.id,
        utenteId: utenteId,
        prodotto: prodotto // Assegna l'oggetto del prodotto al campo prodotto
      };
      items.push(listItem);
      this.listItems.next(items);
      this.updatelistInLocalStorage(items);
    }
  }

  removeFromlist(prodottoId: number, utenteId: number): void {
    let items = this.listItems.value;
    items = items.filter(item => !(item.prodottoId === prodottoId && item.utenteId === utenteId));
    this.listItems.next(items);
    this.updatelistInLocalStorage(items);
  }
}
