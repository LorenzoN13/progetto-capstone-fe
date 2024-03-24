import { Component, OnInit } from '@angular/core';
import { IutenteAuth } from '../../Modules/iutente-auth';
import { LogSystemService } from '../../services/log-system.service';
import { RuoliService } from '../../services/ruoli.service';

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
    private roleSvc: RuoliService
  ) {}

  ngOnInit() {
    this.roleSvc.userRole$.subscribe(user=> this.admin = user?.ruolo== 'admin' ? true : false)
    this.LSS.utente$.subscribe((user: IutenteAuth | null) => {
      this.isLogged = !!user;
      this.user = user!;
    });
  }
}
