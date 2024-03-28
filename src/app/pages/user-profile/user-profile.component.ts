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
  user!:Iutente;
  deletingName!:string;
  deleting!:boolean;
  wrongName!: boolean;
  editMode!:boolean;
  adminSwitch!:boolean;

  constructor(
    private LSS:LogSystemService,
    private OrdineSVC:OrdineService,
  ){
    this.LSS.utente$.subscribe(userAuth =>{
      this.userAuth=userAuth;
      if (this.userAuth) {
        this.user = this.userAuth.obj;
        console.log('Dati utente:', this.user);
       } // Stampare i dati utente nella console per il debug
    });
  }

  deleteAccount(){
    this.deleting=true;
  }

  logOut(){
    this.LSS.logOut()
  }

  confirmDelete() {
    console.log('Entro nel metodo confirmDelete()');
    if (this.deletingName === this.user?.nome) {
      console.log('Il nome da eliminare corrisponde al nome utente.');
      const token = this.userAuth?.token;
      if (token) {
        console.log('Il token è presente:', token);
        console.log('Eseguo la chiamata per eliminare l\'account...');
        this.LSS.deleteAccount(this.user.id, token).subscribe({
          next: () => {
            console.log('Account eliminato con successo.');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Account deleted! See you next time ${this.user?.nome}! We're sorry to see you're going!`,
              showConfirmButton: false,
              timer: 3000
            }).then(() => {
              console.log('Logout dopo eliminazione dell\'account.');
              this.logOut();
            });
          },
          error: (error) => {
            // Gestione degli errori durante l'eliminazione dell'account
            console.error('Errore durante l\'eliminazione dell\'account:', error);
          }
        });
      } else {
        console.error('Token non presente o non valido.');
        // Gestire il caso in cui il token non è presente o non valido
      }
    } else {
      console.log('Il nome da eliminare non corrisponde al nome utente.');
      this.wrongName = true;
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
