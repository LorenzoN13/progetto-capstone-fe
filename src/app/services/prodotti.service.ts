import { Prodotto } from './../Modules/prodotto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Iprodotto } from '../Modules/iprodotto';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private apiUrl = `${environment.API}/prodotti`;
  prodottoTitolo: string = "";

  constructor(private http: HttpClient) { }

  getProdotti():Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProdottoById(id:number):Observable<Iprodotto>{
    return this.http.get<Iprodotto>(`${this.apiUrl}/${id}`);
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  setProdottoName(titolo: string): void {
    this.prodottoTitolo = titolo;
  }

  updateProdotto(prodottoId: number, updatedProdotto: Iprodotto): Observable<Iprodotto> {
    const url = `${this.apiUrl}/${prodottoId}`;
    return this.http.put<Iprodotto>(url, updatedProdotto).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Errore durante l\'aggiornamento della birra'));
      })
    );
  }

  deleteProdotto(id:number):Observable<Iprodotto>{
    return this.http.delete<Iprodotto>(`${this.apiUrl}/${id}`);
  }
}
