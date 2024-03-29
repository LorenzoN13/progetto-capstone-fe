import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Iruolo } from '../Modules/iruolo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RuoliService {

   // BehaviorSubject per memorizzare il ruolo dell'utente loggato
  loggedRoleSub:BehaviorSubject<Iruolo|null>=new BehaviorSubject<Iruolo|null>(null)
  userRole$=this.loggedRoleSub.asObservable(); // Observable per esporre il ruolo dell'utente

   constructor(private http: HttpClient) {
     this.logged(); // Controlla se c'è un ruolo memorizzato localmente all'inizio
   }

   // URL dell'API per gli utenti
   API: string = `${environment.API}/utenti`;

   // Ottiene il ruolo di un utente per ID
   getRoleByUserID(userID: number): Observable<string | undefined> {
     return this.http.get<any>(`${this.API}/${userID}`).pipe(
       map((response: any) => {
         if (response && response.ruoli) {
           return response.ruoli; // Restituisce il ruolo dell'utente
         } else {
           throw new Error('Dati non validi ricevuti dal backend'); // Errore se i dati non sono validi
         }
       }),
       catchError((error: any) => {
         console.error('Errore durante il recupero del ruolo dell\'utente:', error);
         return of(undefined); // Gestione dell'errore ritornando un observable vuoto o un valore di default
       })
     );
   }

   // Imposta il ruolo per un nuovo utente
   setRoleNewUser(userID: string, role: string): Observable<Iruolo> {
     let setRole = { userID, role };
     return this.http.post<Iruolo>(this.API, setRole);
   }

   // Aggiorna il ruolo di un utente
   upgradeUserRole(userRole: Iruolo): Observable<Iruolo> {
     return this.http.put<Iruolo>(`${this.API}/${userRole.id}`, userRole).pipe(
       tap((data) => {
         this.loggedRoleSub.next(data); // Aggiorna il BehaviorSubject con il nuovo ruolo
         localStorage.setItem('ruoli', JSON.stringify(data)); // Salva il nuovo ruolo nel localStorage
       })
     );
   }

   // Cancella il ruolo di un utente
   deleteUserRole(id: number): Observable<Iruolo> {
     return this.http.delete<Iruolo>(`${this.API}/${id}`);
   }

   // Controlla se c'è un ruolo memorizzato localmente all'inizio
   logged() {
     let localRole: string|null = localStorage.getItem('ruoli');
     if (!localRole) return;

     let userRole: Iruolo = JSON.parse(localRole);

     this.loggedRoleSub.next(userRole); // Aggiorna il BehaviorSubject con il ruolo memorizzato
   }
 }
