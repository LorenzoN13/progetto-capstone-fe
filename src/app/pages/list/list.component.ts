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
    // Ottieni l'observable dei prodotti dalla lista
    this.listItems$ = this.listService.getlist();
  }

  removeFromList(prodottoId: number, utenteId: number): void {
    // Rimuovi il prodotto dalla lista utilizzando il servizio ListService
    this.listService.removeFromlist(prodottoId, utenteId);
  }
}
