import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ivalutazioni } from '../Modules/ivalutazioni';

@Injectable({
  providedIn: 'root'
})
export class ValutazioniService {

  private apiUrl = `${environment.API}/valutazione`; // URL dell'API per le valutazioni

  constructor(private http: HttpClient) { }

  // Ottiene tutte le valutazioni
  getValutazioni(): Observable<Ivalutazioni[]> {
    return this.http.get<Ivalutazioni[]>(this.apiUrl);
  }

  // Crea una nuova valutazione
  createValutazione(valutazione: Ivalutazioni, headers: any): Observable<Ivalutazioni> {
    console.log(valutazione);

    // Se l'oggetto headers non è di tipo HttpHeaders, creane uno nuovo
    if (!(headers instanceof HttpHeaders)) {
      // Inizializza headers come HttpHeaders vuoto
      let httpHeaders = new HttpHeaders();

      // Se ci sono headers forniti, aggiungili uno per uno
      if (headers) {
        Object.keys(headers).forEach(key => {
          httpHeaders = httpHeaders.append(key, headers[key]);
        });
      }
      headers = httpHeaders;
    }

    // Effettua la richiesta HTTP POST per creare una nuova valutazione
    return this.http.post<Ivalutazioni>(this.apiUrl, valutazione, { headers });
  }

  // Elimina una valutazione per ID
  deleteValutazione(id: number): Observable<Ivalutazioni> {
    return this.http.delete<Ivalutazioni>(`${this.apiUrl}/${id}`);
  }
}
