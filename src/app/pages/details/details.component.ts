import { ActivatedRoute, Router } from '@angular/router';
import { Iordine } from '../../Modules/iordine';
import { Iprodotto } from '../../Modules/iprodotto';
import { ProdottiService } from './../../services/prodotti.service';
import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { RuoliService } from '../../services/ruoli.service';
import { IutenteAuth } from '../../Modules/iutente-auth';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent{
  admin!: boolean; // Flag per verificare se l'utente è un admin
  isLogged: boolean = false; // Flag per verificare se l'utente è loggato
  prodottoId!: number; // ID del prodotto corrente
  prodotto!: Iprodotto; // Oggetto del prodotto corrente
  allItem: Iordine[] = []; // Lista di tutti gli ordini
  isLoading: boolean = true; // Flag per mostrare o nascondere un indicatore di caricamento

  constructor(
    private route: ActivatedRoute,
    private prodottoSvc: ProdottiService,
    private LSS: LogSystemService,
    private RolesSVC: RuoliService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Ottiene l'ID del prodotto dalla route e carica i dettagli del prodotto
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.prodottoId = +idString;
        this.getProdottoDetails();
      } else {
        console.error('ID del prodotto non presente nei parametri');
      }
    });

    // Sottoscrizione all'evento utente per verificare se l'utente è loggato
    this.LSS.utente$.subscribe((user: IutenteAuth | null) => {
      this.isLogged = !!user; // Imposta il flag isLogged in base alla presenza di un utente
    });

    // Sottoscrizione all'evento ruolo per verificare se l'utente è un admin
    this.RolesSVC.userRole$.subscribe(role => {
      if (!role) return;
      // Imposta il flag admin in base al ruolo dell'utente
      this.admin = role.ruolo == `ADMIN` ? true : false;
    });
  }

  // Metodo per ottenere i dettagli del prodotto dal servizio
  getProdottoDetails(): void {
    this.prodottoSvc.getProdottoById(this.prodottoId).subscribe({
      next: (response: any) => {
        this.prodotto = response.obj; // Assegna i dettagli del prodotto dalla risposta del servizio
        this.isLoading = false; // Imposta isLoading su false una volta che i dettagli del prodotto sono stati ottenuti
        console.log('Dettagli del prodotto:', this.prodotto);
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli del prodotto:', error);
        this.isLoading = false; // Assicura che isLoading sia impostato su false anche in caso di errore
      }
    });
  }

  // Metodo per eliminare un prodotto
  deleteprodotto(id: number): void {
    this.prodottoSvc.deleteProdotto(id).subscribe({
      next: (data: any) => {
        console.log('Prodotto rimosso:', data);

        // Naviga alla pagina home dopo 2 secondi
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Errore durante la rimozione del prodotto:', error);
      }
    });
  }
}
