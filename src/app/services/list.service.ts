import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IListItem } from '../Modules/i-list-item';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listKey = 'wishlistItems';

  wishlistItems: BehaviorSubject<IListItem[]> = new BehaviorSubject<IListItem[]>(this.getWishlistFromLocalStorage());

  constructor() {}

  private getWishlistFromLocalStorage(): IListItem[] {
    const storedWishlist = localStorage.getItem(this.listKey);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  private updateWishlistInLocalStorage(items: IListItem[]): void {
    localStorage.setItem(this.listKey, JSON.stringify(items));
  }

  getWishlist(): Observable<IListItem[]> {
    return this.wishlistItems.asObservable();
  }

  addToWishlist(prodottoId: number, utenteId: number): void {
    const items = this.wishlistItems.value;
    if (!items.find(item => item.prodottoId === prodottoId && item.utenteId === utenteId)) {
      items.push({ id: items.length + 1, prodottoId, utenteId });
      this.wishlistItems.next(items);
      this.updateWishlistInLocalStorage(items);
    }
  }

  removeFromWishlist(prodottoId: number, utenteId: number): void {
    let items = this.wishlistItems.value;
    items = items.filter(item => !(item.prodottoId === prodottoId && item.utenteId === utenteId));
    this.wishlistItems.next(items);
    this.updateWishlistInLocalStorage(items);
  }
}
