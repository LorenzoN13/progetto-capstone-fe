import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Irecensione } from '../Modules/irecensione';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class RecensioniService {

  private apiUrl = `${environment.API}/recensioni`;

  constructor(private http: HttpClient,) { }


  getRecensioni(): Observable<Irecensione[]> {
    return this.http.get<Irecensione[]>(this.apiUrl);
  }

  createRecensione(recensione: Irecensione): Observable<Irecensione> {
    console.log(recensione);
    return this.http.post<Irecensione>(this.apiUrl, recensione)
  }

  deleteRecensioni(id: number): Observable<Irecensione> {
    return this.http.delete<Irecensione>(`${this.apiUrl}/${id}`);
  }
}
