
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RuoliService } from '../../services/ruoli.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(
    private RolesSvc: RuoliService,
    private router: Router
  ) {}

  // Metodo per controllare se l'utente può attivare la route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Si sottoscrive all'observable che emette il ruolo dell'utente
    return this.RolesSvc.userRole$.pipe(
      map(userRole => {
        if (!userRole) return false; // Se non c'è un ruolo, l'utente non è autenticato
        let admin = userRole.ruolo == `admin` ? true : false; // Verifica se l'utente ha il ruolo di admin
        if (!admin) this.router.navigate([`/`]); // Se l'utente non è un admin, lo reindirizza alla home
        return admin; // Ritorna true se l'utente è un admin e può accedere alla route
      })
    );
  }

  // Metodo per controllare se l'utente può attivare i figli della route
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state); // Chiama semplicemente il metodo canActivate per controllare l'autenticazione dell'utente
  }
}
