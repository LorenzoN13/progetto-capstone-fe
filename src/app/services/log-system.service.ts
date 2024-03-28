import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IutenteAuth } from '../Modules/iutente-auth';
import { Iutente } from '../Modules/iutente';
import { Iregister } from '../Modules/iregister';
import { Ilogin } from '../Modules/ilogin';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LogSystemService {

  authorized:BehaviorSubject<IutenteAuth|null>=new BehaviorSubject<IutenteAuth|null>(null);
  utente$=this.authorized.asObservable();
  booleanUtente$=this.utente$.pipe(map(utente=>!!utente))
  jwt:JwtHelperService=new JwtHelperService();

  APIUser:string=`${environment.API}/utenti`
  APIRegister:string=`${environment.API}/auth/register`;
  APILogin:string=`${environment.API}/auth/login`;


  constructor(
    private http:HttpClient,
    private router: Router
  ){
    this.logged();
  }

  getUserData(): Observable<IutenteAuth> {
    return this.http.get<IutenteAuth>(this.APIUser);
  }

  register(utente:Iregister):Observable<IutenteAuth>{
    return this.http.post<IutenteAuth>(this.APIRegister,utente)
  }

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
    return this.http.put<IutenteAuth>(`${this.APIUser}/${utente.obj.id}`, utente.obj, { headers })
      .pipe(
        catchError(error => {
          // Gestisci gli errori qui, ad esempio se la richiesta ha restituito un errore HTTP
          console.error('Errore durante l\'aggiornamento dell\'utente:', error);
          return throwError(() => error); // Aggiorna l'uso di throwError con la nuova firma
        })
      );
  }


  login(utente:Ilogin):Observable<IutenteAuth>{
    return this.http.post<IutenteAuth>(this.APILogin,utente)
    .pipe(tap(data=>{
      this.authorized.next(data);
      this.autoLogOut(data.token)
      localStorage.setItem('utente', JSON.stringify(data))
    }))
  }

  logged(){
    let localLogin:string|null=localStorage.getItem('utente');
    if (!localLogin) return;

    let oldAuth:IutenteAuth=JSON.parse(localLogin);
    if(this.jwt.isTokenExpired(oldAuth.token)) return

    this.autoLogOut(oldAuth.token);
    this.authorized.next(oldAuth);
  }

  logOut(){
    localStorage.removeItem('utente');
    localStorage.removeItem('ruolo');
    this.authorized.next(null);
    this.router.navigate(['/home']);
  }

  deleteAccount(id: number, token: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      })
    };
    return this.http.delete<void>(`${this.APIUser}/${id}`, httpOptions);
  }

  autoLogOut(token: string): void {
    const expiringDate = this.jwt.getTokenExpirationDate(token) as Date;

    if (expiringDate) { // Verifica che expiringDate non sia null o undefined
      const remainingTimeMs = expiringDate.getTime() - new Date().getTime();

      if (remainingTimeMs > 0) {
        setTimeout(() => {
          this.logOut();
        }, remainingTimeMs);

      } else {
        // Il token è già scaduto, esegui il logout immediatamente
        this.logOut();
      }
    }
  }
}
