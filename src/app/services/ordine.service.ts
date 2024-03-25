import { Prodotto } from './../Modules/prodotto';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Iordine } from '../Modules/iordine';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Iordinearticolo } from '../Modules/iordinearticolo';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  apiUrlShop= `${environment.API}/ordini`;
  totalCart = new BehaviorSubject<number>(0);
  ordine$ = this.totalCart.asObservable();
  allitemSubject : BehaviorSubject<Iordine []|null> = new BehaviorSubject<Iordine []|null>(null);
  allItem$ = this.allitemSubject.asObservable();

  constructor(
    private http:HttpClient
  ) { }



  setAllItemSubject(data: Iordine[]) {
    this.allitemSubject.next(data);
  }


  setTotalCart(data: number) {
    this.totalCart.next(data);
  }


  getShop(id: number): Observable<Iordine[]> {
    let params = new HttpParams().set('userId', id.toString());

    return this.http.get<Iordine[]>(this.apiUrlShop, { params }).pipe(
      catchError(this.errorHandler)
    );
  }

  addToShop(userId: number, prodotto: Iordinearticolo) {
    let numeroprdottivenduti = 1; // Valore predefinito
    if (prodotto.quantita !== undefined && prodotto.quantita > 1) {
      numeroprdottivenduti = prodotto.quantita;
    }
    return this.http
      .post('http://localhost:8080/api/ordini',
        {
          userId: userId,
          ordine: prodotto.idOrdine,
          prodottoid: prodotto.idProdotto,
          quantita: numeroprdottivenduti,
          prezzo: prodotto.prezzo,
          dimensione:prodotto.dimensione,
          prezzoTotale:prodotto.prezzo * numeroprdottivenduti
        }).pipe(tap(()=> {
          // this.totalCart.next(beer.price)
        }))
  }

  updateShopItem(prodottoId: number|undefined, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrlShop}/${prodottoId}`, updatedData);
  }

  deleteCart(id?: number):Observable<any>{
    return this.http.delete(`${this.apiUrlShop}/${id}`);
  }


  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  calculateTotalCart(items: Iordine[]): number {
  return items.reduce((total, item) => total + item.prezzoTotale, 0);
}
}
