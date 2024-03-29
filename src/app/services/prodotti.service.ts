import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Iprodotto } from '../Modules/iprodotto';
import { IProdottoByIdResponse } from '../Modules/i-prodotto-by-id-response';


@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private apiUrl = `${environment.API}/prodotti`; // URL dell'API per i prodotti
  prodottoTitolo: string = ""; // Variabile per il titolo del prodotto

  constructor(private http: HttpClient) { }

  // Ottiene tutti i prodotti
  getProdotti(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crea un nuovo prodotto
  createProduct(prodotto: Iprodotto): Observable<Iprodotto> {
    console.log("----------- ", prodotto); // Log del prodotto
    return this.http.post<Iprodotto>(`${this.apiUrl}`, prodotto);
  }

  // Ottiene un prodotto per ID
  getProdottoById(id: number): Observable<IProdottoByIdResponse> {
    return this.http.get<IProdottoByIdResponse>(`${this.apiUrl}/${id}`);
  }

  // Gestisce gli errori HTTP
  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  // Imposta il nome del prodotto
  setProdottoName(titolo: string): void {
    this.prodottoTitolo = titolo;
  }

  // Aggiorna un prodotto
  updateProdotto(prodottoId: number, updatedProdotto: Iprodotto): Observable<Iprodotto> {
    const url = `${this.apiUrl}/${prodottoId}`;
    return this.http.put<Iprodotto>(url, updatedProdotto).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Errore durante l\'aggiornamento della birra'));
      })
    );
  }

  // Elimina un prodotto
  deleteProdotto(id: number): Observable<Iprodotto> {
    return this.http.delete<Iprodotto>(`${this.apiUrl}/${id}`);
  }
}
