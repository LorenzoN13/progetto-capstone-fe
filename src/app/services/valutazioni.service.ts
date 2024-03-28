import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ivalutazioni } from '../Modules/ivalutazioni';

@Injectable({
  providedIn: 'root'
})
export class ValutazioniService {

  private apiUrl = `${environment.API}/valutazione`;

  constructor(private http: HttpClient,) { }


  getValutazioni(): Observable<Ivalutazioni[]> {
    return this.http.get<Ivalutazioni[]>(this.apiUrl);
  }

  createValutazione(recensione: Ivalutazioni): Observable<Ivalutazioni> {
    console.log(recensione);
    return this.http.post<Ivalutazioni>(this.apiUrl, recensione)
  }

  deleteValutazione(id: number): Observable<Ivalutazioni> {
    return this.http.delete<Ivalutazioni>(`${this.apiUrl}/${id}`);
  }
}
