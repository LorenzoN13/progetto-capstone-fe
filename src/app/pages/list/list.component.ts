import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IListItem } from '../../Modules/i-list-item';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  listItems$!: Observable<IListItem[]>;

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    // Ottieni l'observable dei prodotti dalla lista chiamando il metodo getlist() del servizio ListService
    this.listItems$ = this.listService.getlist();
  }

  // Funzione per rimuovere un prodotto dalla lista
  removeFromList(prodottoId: number, utenteId: number): void {
    // Chiamata al metodo removeFromlist() del servizio ListService per rimuovere il prodotto dalla lista
    this.listService.removeFromlist(prodottoId, utenteId);
  }
}
