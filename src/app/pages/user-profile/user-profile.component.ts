import { Component } from '@angular/core';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { Iutente } from '../../Modules/iutente';
import { LogSystemService } from '../../services/log-system.service';
import { RuoliService } from '../../services/ruoli.service';
import { OrdineService } from '../../services/ordine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userAuth!:IutenteAuth|null
  user!:Iutente|undefined;
  deletingName!:string;
  deleting!:boolean;
  wrongName!: boolean;
  editMode!:boolean;
  adminSwitch!:boolean;

  constructor(
    private LSS:LogSystemService,
    private RolesSVC:RuoliService,
    private OrdineSVC:OrdineService,
  ){
    this.LSS.utente$.subscribe(userAuth =>{
      this.userAuth=userAuth;
      this.user=this.userAuth?.utente;
    });
  }

  deleteAccount(){
    this.deleting=true;
  }

  logOut(){
    this.LSS.logOut()
  }

  confirmDelete(){
    if(this.deletingName==this.user?.nome){
      this.LSS.deleteAccount(this.user.id).subscribe(()=>{
        if(!this.user?.id) return
        this.RolesSVC.deleteUserRole(this.user?.id).subscribe(()=>{
          this.deleteCartArr();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Account deleted! See you next time ${this.user?.nome}! We're sorry to see you're going!`,
            showConfirmButton: false,
            timer: 3000
          }).then(()=>this.logOut());

        })
      })
    }else{
      this.wrongName=true;
    }
  }

  cancelDelete(){
    this.deleting=false;
  }

  deleteCartArr(){
    if(!this.user?.id) return
    this.OrdineSVC.getShop(Number(this.user?.id)).subscribe(cartArr=>{
      cartArr.forEach(element => {
        this.OrdineSVC.deleteCart(element.id).subscribe();
      });
    })
  }

}
