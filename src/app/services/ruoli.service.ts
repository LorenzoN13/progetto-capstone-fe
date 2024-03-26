import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Iruolo } from '../Modules/iruolo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RuoliService {

  loggedRoleSub:BehaviorSubject<Iruolo|null>=new BehaviorSubject<Iruolo|null>(null)
  userRole$=this.loggedRoleSub.asObservable();

  constructor(private http:HttpClient) {
    this.logged();
  }

  API:string=`${environment.API}`

  getRoleByUserID(userID:string):Observable<Iruolo|undefined>{
    return this.http.get<Iruolo[]>(this.API).pipe(map(rolesArr=>rolesArr.find(element=>{
      if(element.utenteID==userID){
        localStorage.setItem('role', JSON.stringify(element))
        this.loggedRoleSub.next(element);
        return element
      }
      return undefined
    })))
  }

  setRoleNewUser(userID:string,role:string):Observable<Iruolo>{
    let setRole={userID,role}
    return this.http.post<Iruolo>(this.API,setRole)
  }

  upgradeUserRole(userRole:Iruolo):Observable<Iruolo>{
    return this.http.put<Iruolo>(`${this.API}/${userRole.id}/promoteToAdmin`,userRole)
    .pipe(tap((data)=>{
      this.loggedRoleSub.next(data);
      localStorage.setItem('role', JSON.stringify(data));
    }));
  }

  deleteUserRole(id:string):Observable<Iruolo>{
    return this.http.delete<Iruolo>(`${this.API}/${id}/promoteToAdmin`);
  }

  logged(){
    let localRole:string|null=localStorage.getItem('ruolo');
    if (!localRole) return;

    let userRole:Iruolo=JSON.parse(localRole);

    this.loggedRoleSub.next(userRole);
  }
}
