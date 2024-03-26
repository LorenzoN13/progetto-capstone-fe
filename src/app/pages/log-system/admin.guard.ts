
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RuoliService } from '../../services/ruoli.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(
    private RolesSvc:RuoliService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.RolesSvc.userRole$.pipe(map(userRole=>{
        if(!userRole) return false;
        let admin= userRole.ruolo==`admin`?true:false
        if(!admin)this.router.navigate([`/`]);
        return admin
      }));;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute,state);
  }
}
