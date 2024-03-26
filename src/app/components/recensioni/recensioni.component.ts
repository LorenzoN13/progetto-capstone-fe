import { Component } from '@angular/core';
import { Irecensione } from '../../Modules/irecensione';
import { Iprodotto } from '../../Modules/iprodotto';
import { ActivatedRoute } from '@angular/router';
import { LogSystemService } from '../../services/log-system.service';
import { RecensioniService } from '../../services/recensioni.service';
import { IutenteAuth } from '../../Modules/iutente-auth';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrl: './recensioni.component.scss'
})
export class RecensioniComponent {
  recensioni: Irecensione[] = [];
  isLogged: boolean = false;
  prodottoId!: number;
  prodotto!: Iprodotto;

  constructor(
    private route: ActivatedRoute,
    private LSS:LogSystemService,
    private recesioneSvc: RecensioniService
    ){}

  OnInit(){
    this.InRecensioni
    this.LSS.utente$.subscribe((user:IutenteAuth|null)=>{
      this.isLogged=!!user;
    })
  }

  InRecensioni(){
    this.recesioneSvc.getRecensioni().subscribe(
      (recensioni) => {
        this.recensioni = recensioni;
        console.log(this.recensioni);
      }
    )
  }


}
