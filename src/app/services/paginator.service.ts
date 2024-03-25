import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  paginate(data: any[], page: number, itemsPerPage: number): any[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }
}
