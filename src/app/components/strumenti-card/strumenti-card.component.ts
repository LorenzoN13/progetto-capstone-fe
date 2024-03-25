import { Component, Input } from '@angular/core';
import { Iprodotto } from '../../Modules/iprodotto';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { LogSystemService } from '../../services/log-system.service';

@Component({
  selector: 'app-strumenti-card',
  templateUrl: './strumenti-card.component.html',
  styleUrl: './strumenti-card.component.scss'
})
export class StrumentiCardComponent {
  @Input() prodotto!: Iprodotto;
  loggedInUser: IutenteAuth | null = null;
  isLogged: boolean = false;
  userId!: string | undefined;

  constructor(
    private logService: LogSystemService,
  ) {
    this.logService.utente$.subscribe((user: IutenteAuth | null) => {
      this.loggedInUser = user;
      this.userId = user?.utente.id;
      this.isLogged = !!user;
    });
  }
}
