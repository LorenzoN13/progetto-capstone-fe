import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IListItem } from '../Modules/i-list-item';
import { Iprodotto } from '../Modules/iprodotto';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listKey = 'listItems'; // Chiave per l'accesso ai dati nella localStorage

listItems: BehaviorSubject<IListItem[]> = new BehaviorSubject<IListItem[]>(this.getlistFromLocalStorage()); // Observable BehaviorSubject contenente la lista degli elementi

constructor() {}

// Metodo privato per recuperare la lista degli elementi dalla localStorage
private getlistFromLocalStorage(): IListItem[] {
  const storedWishlist = localStorage.getItem(this.listKey); // Recupera i dati dalla localStorage utilizzando la chiave
  return storedWishlist ? JSON.parse(storedWishlist) : []; // Se ci sono dati nella localStorage, li converte da stringa JSON a oggetto JavaScript, altrimenti restituisce un array vuoto
}

// Metodo per aggiornare la lista degli elementi nella localStorage
updatelistInLocalStorage(items: IListItem[]): void {
  localStorage.setItem(this.listKey, JSON.stringify(items)); // Converte la lista degli elementi in una stringa JSON e la salva nella localStorage utilizzando la chiave
}

// Metodo per ottenere la lista degli elementi come Observable
getlist(): Observable<IListItem[]> {
  return this.listItems.asObservable(); // Restituisce la BehaviorSubject come Observable per consentire la sottoscrizione e l'osservazione dei cambiamenti nella lista degli elementi
}

// Metodo per aggiungere un elemento alla lista
addTolist(prodotto: Iprodotto, utenteId: number): void {
  const items = this.listItems.value; // Recupera gli elementi attualmente presenti nella lista
  // Verifica se il prodotto è già presente nella lista
  if (!items.find(item => item.prodottoId === prodotto.id)) {
    const listItem: IListItem = {
      id: items.length + 1, // Assegna un nuovo ID univoco
      prodottoId: prodotto.id,
      utenteId: utenteId,
      prodotto: prodotto // Assegna l'oggetto del prodotto al campo prodotto
    };
    items.push(listItem); // Aggiunge il nuovo elemento alla lista
    this.listItems.next(items); // Aggiorna la BehaviorSubject con la nuova lista di elementi
    this.updatelistInLocalStorage(items); // Aggiorna la lista nella localStorage
  }
}

// Metodo per rimuovere un elemento dalla lista
removeFromlist(prodottoId: number, utenteId: number): void {
  let items = this.listItems.value; // Recupera gli elementi attualmente presenti nella lista
  items = items.filter(item => !(item.prodottoId === prodottoId && item.utenteId === utenteId)); // Filtra gli elementi rimuovendo quelli che corrispondono al prodottoId e all'utenteId specificati
  this.listItems.next(items); // Aggiorna la BehaviorSubject con la nuova lista di elementi
  this.updatelistInLocalStorage(items); // Aggiorna la lista nella localStorage
}
}
