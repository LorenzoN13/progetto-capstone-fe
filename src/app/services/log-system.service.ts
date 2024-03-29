import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IutenteAuth } from '../Modules/iutente-auth';
import { Iregister } from '../Modules/iregister';
import { Ilogin } from '../Modules/ilogin';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LogSystemService {

authorized: BehaviorSubject<IutenteAuth | null> = new BehaviorSubject<IutenteAuth | null>(null); // BehaviorSubject per gestire lo stato dell'autenticazione dell'utente
utente$: Observable<IutenteAuth | null> = this.authorized.asObservable(); // Observable per l'utente autenticato
booleanUtente$: Observable<boolean> = this.utente$.pipe(map(utente => !!utente)); // Observable booleano che indica se un utente è autenticato o meno
jwt: JwtHelperService = new JwtHelperService(); // Servizio per gestire i token JWT

APIUser: string = `${environment.API}/utenti`; // URL per le richieste relative agli utenti
APIRegister: string = `${environment.API}/auth/register`; // URL per la registrazione degli utenti
APILogin: string = `${environment.API}/auth/login`; // URL per il login degli utenti

constructor(
  private http: HttpClient,
  private router: Router
) {
  this.logged(); // Controlla lo stato di autenticazione al caricamento del servizio
}

// Metodo per ottenere i dati dell'utente
getUserData(): Observable<IutenteAuth> {
  return this.http.get<IutenteAuth>(this.APIUser);
}

// Metodo per registrare un nuovo utente
register(utente: Iregister): Observable<IutenteAuth> {
  return this.http.post<IutenteAuth>(this.APIRegister, utente);
}

// Metodo per aggiornare i dati di un utente
updateUser(utente: IutenteAuth): Observable<any> {
  // Ottieni il token dall'utente autenticato
  const token = utente.token;

  // Verifica se il token è disponibile
  if (!token) {
    // Se il token è mancante, restituisci un errore
    return throwError('Token mancante');
  }

  // Crea l'header con il token
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${token}`
  });

  // Effettua la richiesta HTTP PUT per aggiornare l'utente
  return this.http.put<IutenteAuth>(`${this.APIUser}/${utente.obj.id}`, utente.obj, { headers }).pipe(
    catchError(error => {
      console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      return throwError(() => error);
    })
  );
}

// Metodo per effettuare il login
login(utente: Ilogin): Observable<IutenteAuth> {
  return this.http.post<IutenteAuth>(this.APILogin, utente).pipe(
    tap(data => {
      this.authorized.next(data); // Imposta l'utente autenticato
      this.autoLogOut(data.token); // Imposta il logout automatico in base alla scadenza del token
      localStorage.setItem('utente', JSON.stringify(data)); // Salva i dati dell'utente nella localStorage
    })
  );
}

// Metodo per controllare lo stato di autenticazione salvato nella localStorage
logged() {
  let localLogin: string|null = localStorage.getItem('utente');
  if (!localLogin) return;

  let oldAuth: IutenteAuth = JSON.parse(localLogin);
  if (this.jwt.isTokenExpired(oldAuth.token)) return;

  this.autoLogOut(oldAuth.token);
  this.authorized.next(oldAuth);
}

// Metodo per effettuare il logout
logOut() {
  localStorage.removeItem('utente');
  localStorage.removeItem('ruolo');
  this.authorized.next(null);
  this.router.navigate(['/home']);
}

// Metodo per eliminare un account utente
deleteAccount(id: number, token: string): Observable<void> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    })
  };
  return this.http.delete<void>(`${this.APIUser}/${id}`, httpOptions);
}

// Metodo per effettuare il logout automatico in base alla scadenza del token
autoLogOut(token: string): void {
  const expiringDate = this.jwt.getTokenExpirationDate(token) as Date;

  if (expiringDate) {
    const remainingTimeMs = expiringDate.getTime() - new Date().getTime();

      if (remainingTimeMs > 0) {
        setTimeout(() => {
          this.logOut();
        }, remainingTimeMs);
      } else {
        this.logOut();
      }
    }
  }
}
