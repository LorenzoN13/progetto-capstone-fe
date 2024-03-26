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
islogged:boolean = false;
utenteId!: number|undefined;
currentPage: number = 1;
itemsPerPage: number = 25;

constructor(
  private prodottiService: ProdottiService,
  private paginatorService: PaginatorService,
  private logService: LogSystemService,
){}

ngOnInit(): void {
  this.logService.utente$.subscribe((user:IutenteAuth|null)=>{
    this.islogged = !!user
    this.utenteId = user?.utente.id
  })
  this.fetchProdotti();

}

fetchProdotti(): void {
  this.prodottiService.getProdotti().subscribe({
    next: (data: any[]) => {
      this.allProdotti = data;
      this.updatePage();
      console.log(this.allProdotti)
    },
    error: (error) => {
      console.error('Errore nel recupero dei prodotti:', error);
    }
  });
}

updatePage(): void {
  if (this.prodottiService.prodottoTitolo) {
    this.prodotti = this.allProdotti.filter((beer: any) =>
      beer.nome.toLowerCase().includes(this.prodottiService.prodottoTitolo.toLowerCase())
    );
  } else {
    this.prodotti = this.paginatorService.paginate(this.allProdotti, this.currentPage, this.itemsPerPage);
  }
}

onPageChange(page: number): void {
  this.currentPage = page;
  this.updatePage();
}

searchProdottiByName(nome: string): void {
  if (!nome) {
    this.prodotti = this.allProdotti.slice();
    return;
  }
  // Filtra le birre in base al nome
  this.prodotti = this.allProdotti.filter((beer: any) =>
    beer.nome.toLowerCase().includes(nome.toLowerCase())
  );
  this.updatePage();
}

handleBeerNameEvent(nome: string): void {
  this.prodottiService.setProdottoName(nome);
  this.updatePage();
}
}
