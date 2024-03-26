import { ActivatedRoute, Router } from '@angular/router';
import { Iordine } from '../../Modules/iordine';
import { Iprodotto } from '../../Modules/iprodotto';
import { ProdottiService } from './../../services/prodotti.service';
import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { ListService } from '../../services/list.service';
import { OrdineService } from '../../services/ordine.service';
import { RuoliService } from '../../services/ruoli.service';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { EMPTY, Observable, catchError, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  admin!:boolean
  isLogged: boolean = false;
  prodottoId!: number;
  prodotto!: Iprodotto;
  allItem: Iordine[]= [];

  constructor(
    private route: ActivatedRoute,
    private prodottoSvc: ProdottiService,
    private LSS:LogSystemService,
    private listService: ListService,
    private ordineSvc: OrdineService,
    private RolesSVC:RuoliService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.prodottoId = +idString;
        this.getProdottoDetails();
      } else {
        console.error('ID del prodotto non presente nei parametri');
      }
    });

    this.LSS.utente$.subscribe((user: IutenteAuth | null) => {
      this.isLogged = !!user;
      if (user && user.utente.id) {
        const userId = Number(user.utente.id); // Ottieni l'ID dell'utente da LSS.user$
        this.fetchShop(userId); // Passa l'ID dell'utente a fetchShop() per ottenere le birre associate a quell'utente
      }
    });

    this.RolesSVC.userRole$.subscribe(role =>{
      if(!role) return;
      this.admin=role.ruolo==`ADMIN`?true:false
    });
  }

  getProdottoDetails(): void {
    this.prodottoSvc.getProdottoById(this.prodottoId).subscribe({
      next: (prodotto: Iprodotto) => {
        this.prodotto = prodotto;
        console.log('Dettagli del prodotto:', this.prodotto);
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli del prodotto:', error);
      }
    });
  }


  fetchShop(userId: number): void {
    this.ordineSvc.getShop(userId).subscribe({
      next: (data:any) => {
        this.allItem = data; // Assegna l'array di IShop alla variabile allItem
        console.log('Tutti i prodotti presenti nello shop:', this.allItem);
      },
      error: (error) => {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    });
  }


  addTolist(prodottoId: number, utenteId: number): Observable<void> {
    return new Observable<void>((observer) => {
      try {
        const items = this.listService.wishlistItems.value; // Accedi al valore corrente di wishlistItems
        if (!items.find(item => item.prodottoId === prodottoId && item.utenteId === utenteId)) {
          items.push({ id: items.length + 1, prodottoId, utenteId });
          this.listService.wishlistItems.next(items);
          this.listService.updateWishlistInLocalStorage(items);
        }
        observer.next(); // Invia un segnale di completamento all'observable
        observer.complete(); // Completa l'observable
      } catch (error) {
        observer.error(error); // Invia eventuali errori all'observable
      }
    });
  }



  deleteprodotto(id: number): void {
    this.prodottoSvc.deleteProdotto(id).subscribe({
      next: (data: any) => {
        console.log('Prodotto rimosso:', data);


        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Errore durante la rimozione del prodotto:', error);
      }
    });
  }
}
