import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  paginate(data: any[], page: number, itemsPerPage: number): any[] {
    // Calcola l'indice iniziale degli elementi per la pagina corrente
    const startIndex = (page - 1) * itemsPerPage;
    // Calcola l'indice finale degli elementi per la pagina corrente
    const endIndex = startIndex + itemsPerPage;
    // Restituisce un sottoinsieme dell'array dati che rappresenta la pagina specificata
    return data.slice(startIndex, endIndex);
  }
}
