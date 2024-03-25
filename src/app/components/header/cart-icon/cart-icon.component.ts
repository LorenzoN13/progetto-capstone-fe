import { Component } from '@angular/core';
import { IutenteAuth } from '../../../Modules/iutente-auth';
import { Iordine } from '../../../Modules/iordine';
import { LogSystemService } from '../../../services/log-system.service';
import { OrdineService } from '../../../services/ordine.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss'
})
export class CartIconComponent {
  isLogged = false;
  user!: IutenteAuth;
  totalCart!: number;
  allItem: Iordine[] = [];
  loggedInUser: IutenteAuth | null = null;
  userId! : number

  constructor(
    private LSS: LogSystemService,
    private ordineSvc: OrdineService
  ) {}

  ngOnInit() {
    this.LSS.utente$.subscribe((user: IutenteAuth | null) => {
      this.loggedInUser = user;
      this.userId = Number(user?.utente.id)
      this.isLogged = !!user;
    });
    this.fetchShopUpdate(this.userId);
    this.ordineSvc.ordine$.subscribe((total: number) => {
      this.totalCart = total;
    });
  }

  fetchShopUpdate(userId: number): void {
    this.ordineSvc.getShop(userId).subscribe({
      next: (data: any) => {
        this.allItem = data;
        console.log(this.allItem);
        const updatedTotal = this.ordineSvc.calculateTotalCart(this.allItem);
        this.ordineSvc.setTotalCart(updatedTotal);
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }

}
