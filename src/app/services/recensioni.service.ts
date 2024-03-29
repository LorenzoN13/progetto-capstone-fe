import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Irecensione } from '../Modules/irecensione';
import { environment } from '../../environments/environment.development';
import { IProdottoByIdResponse } from '../Modules/i-prodotto-by-id-response';



@Injectable({
  providedIn: 'root'
})
export class RecensioniService {

  private apiUrl = `${environment.API}/recensioni`; // URL dell'API per le recensioni

  constructor(private http: HttpClient) { }

  // Ottiene tutte le recensioni
  getRecensioni(): Observable<Irecensione[]> {
    return this.http.get<Irecensione[]>(this.apiUrl);
  }

  // Crea una nuova recensione
  createRecensione(recensione: Irecensione): Observable<Irecensione> {
    console.log(recensione); // Log della recensione
    return this.http.post<Irecensione>(this.apiUrl, recensione);
  }

  // Elimina una recensione per ID
  deleteRecensioni(id: number): Observable<Irecensione> {
    return this.http.delete<Irecensione>(`${this.apiUrl}/${id}`);
  }

  // Ottiene un prodotto per ID
  getProdottoById(id: number): Observable<IProdottoByIdResponse> {
    return this.http.get<IProdottoByIdResponse>(`${this.apiUrl}/${id}`);
  }
}
