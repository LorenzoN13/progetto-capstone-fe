import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Iruolo } from '../Modules/iruolo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RuoliService {

  loggedRoleSub:BehaviorSubject<Iruolo|null>=new BehaviorSubject<Iruolo|null>(null)
  userRole$=this.loggedRoleSub.asObservable();

  constructor(private http:HttpClient) {
    this.logged();
  }

  API:string=`${environment.API}/utenti`

  getRoleByUserID(userID: number): Observable<string | undefined> {
    return this.http.get<any>(`${this.API}/${userID}`).pipe(
      map((response: any) => {
        if (response && response.ruoli) {
          return response.ruoli;
        } else {
          throw new Error('Dati non validi ricevuti dal backend');
        }
      }),
      catchError((error: any) => {
        console.error('Errore durante il recupero del ruolo dell\'utente:', error);
        // Gestire l'errore in modo appropriato, ad esempio ritornando un valore di default
        return of(undefined); // Ritorna un observable vuoto o un valore di default
      })
    );
  }

  setRoleNewUser(userID:string,role:string):Observable<Iruolo>{
    let setRole={userID,role}
    return this.http.post<Iruolo>(this.API,setRole)
  }

  upgradeUserRole(userRole:Iruolo):Observable<Iruolo>{
    return this.http.put<Iruolo>(`${this.API}/${userRole.id}`,userRole)
    .pipe(tap((data)=>{
      this.loggedRoleSub.next(data);
      localStorage.setItem('role', JSON.stringify(data));
    }));
  }

  deleteUserRole(id:number):Observable<Iruolo>{
    return this.http.delete<Iruolo>(`${this.API}/${id}`);
  }

  logged(){
    let localRole:string|null=localStorage.getItem('role');
    if (!localRole) return;

    let userRole:Iruolo=JSON.parse(localRole);

    this.loggedRoleSub.next(userRole);
  }
}
