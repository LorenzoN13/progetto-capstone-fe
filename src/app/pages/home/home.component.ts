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
  prodotti: Iprodotto[] = [];
  allProdotti: Iprodotto[] = [];
  islogged: boolean = false;
  utenteId: number | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 25;

  constructor(
    private prodottiService: ProdottiService,
    private paginatorService: PaginatorService,
    private logService: LogSystemService,
  ) {}

  ngOnInit(): void {
    this.logService.utente$.subscribe((user: IutenteAuth | null) => {
      if (user && user.obj && user.obj.id) {
        this.islogged = true;
        this.utenteId = user.obj.id;
      } else {
        this.islogged = false;
        this.utenteId = undefined;
      }
    });
    this.fetchProdotti();
  }

  fetchProdotti(): void {
    this.prodottiService.getProdotti().subscribe({
      next: (response: any) => {
        if (response && response.obj && response.obj.content) {
          this.prodotti = response.obj.content;
          this.updatePage(); // Aggiorna la paginazione dopo aver assegnato i dati
        } else {
          console.error('Struttura dati non valida nella risposta del server.');
        }
      },
      error: (error) => {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    });
  }

  updatePage(): void {
    this.prodotti = this.paginatorService.paginate(this.prodotti, this.currentPage, this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  searchProdottiByName(nome: string): void {
    if (!nome) {
      this.prodotti = this.allProdotti.slice();
    } else {
      this.prodotti = this.allProdotti.filter((prodotto: Iprodotto) =>
        prodotto.titolo.toLowerCase().includes(nome.toLowerCase())
      );
    }
    this.updatePage();
  }

  handleBeerNameEvent(nome: string): void {
    this.prodottiService.setProdottoName(nome);
    this.updatePage();
  }
}
