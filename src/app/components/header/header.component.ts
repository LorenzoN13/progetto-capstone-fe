import { Component, OnInit } from '@angular/core';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { LogSystemService } from '../../services/log-system.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isLogged = false;
  user!: IutenteAuth;
  toggle: boolean=true;
  admin: boolean = false;

  constructor(
    private LSS: LogSystemService,
  ) {}

  ngOnInit() {
    this.LSS.utente$.subscribe((user: IutenteAuth | null) => {
      this.isLogged = !!user;
      this.user = user!;
    });
  }
}
