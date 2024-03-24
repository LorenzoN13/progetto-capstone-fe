import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LogSystemService } from '../../services/log-system.service';

@Injectable({
  providedIn: 'root'
})
export class LogGuard {
  constructor(
    private LSS:LogSystemService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.LSS.booleanUtente$.pipe(map(logged=>{
        if(!logged) this.router.navigate(['/LogSystem/login']);
        return logged
      }));;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute,state);
  }
}
