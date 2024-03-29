import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LogSystemService } from '../../services/log-system.service';

@Injectable({
  providedIn: 'root'
})
export class LogGuard {
  constructor(
    private LSS: LogSystemService, // Servizio per il sistema di gestione dell'accesso
    private router: Router // Servizio per la gestione delle rotte
  ) {}

  // Metodo che viene chiamato per controllare se l'utente può attivare la rotta principale
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Controlla lo stato di accesso dell'utente utilizzando il servizio LogSystemService
    return this.LSS.booleanUtente$.pipe(
      map(logged => {
        // Se l'utente non è loggato, reindirizza alla pagina di login
        if (!logged) {
          this.router.navigate(['/LogSystem/login']);
        }
        // Restituisce true se l'utente è loggato, altrimenti restituisce false
        return logged;
      })
    );
  }

  // Metodo che viene chiamato per controllare se l'utente può attivare una rotta figlia
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Richiama il metodo canActivate per controllare l'accesso alla rotta figlia
    return this.canActivate(childRoute, state);
  }
}
