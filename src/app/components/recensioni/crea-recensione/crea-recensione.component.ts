import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecensioniService } from '../../../services/recensioni.service';
import { Irecensione } from '../../../Modules/irecensione';
import { LogSystemService } from '../../../services/log-system.service';
import { IutenteAuth } from '../../../Modules/iutente-auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crea-recensione',
  templateUrl: './crea-recensione.component.html',
  styleUrl: './crea-recensione.component.scss'
})
export class CreaRecensioneComponent implements OnInit{
  isLogged: boolean = false;
  @Input() prodottoId!: number;
  recensioneForm!: FormGroup;
  utenteId: number | undefined;
  recensione: Irecensione = {
    recensione: '',
    idUtente: 0,
    idProdotto: 0
  };

  constructor(
    private formBuilder: FormBuilder,
    private recensioneSvc: RecensioniService,
    private logService: LogSystemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recensioneForm = this.formBuilder.group({
      recensione: ['', Validators.required]
    });

    this.logService.utente$.subscribe((user: IutenteAuth | null) => {
      if (user && user.obj && user.obj.id) {
        this.isLogged = true;
        this.utenteId = user.obj.id;
        console.log('ID utente:', this.utenteId);
      } else {
        this.isLogged = false;
        this.utenteId = undefined;
        console.log('ID utente non disponibile.');
      }
    });


    this.route.params.subscribe(params => {
      const idString = params['id'];
      if (idString !== null) {
        this.prodottoId = +idString;
        console.log('ID del prodotto recuperato:', this.prodottoId);
      } else {
        console.error('ID del prodotto non trovato nei parametri dell\'URL');
      }
    });

  }

  submitForm(): void {
    if (!this.utenteId) {
      console.error('ID utente non disponibile.');
      // Gestisci il caso in cui l'ID dell'utente non è disponibile
      return;
    }

    if (!this.prodottoId) {
      console.error('ID del prodotto non disponibile.');
      // Gestisci il caso in cui l'ID del prodotto non è disponibile
      return;
    }

    this.recensione.idUtente = this.utenteId;
    this.recensione.idProdotto = this.prodottoId;
    console.log('Dati della recensione da inviare:', this.recensione);

    this.recensioneSvc.createRecensione(this.recensione).subscribe({
      next: (response: Irecensione) => {
        console.log('Recensione inviata con successo:', response);
        // Puoi fare ulteriori operazioni dopo aver ricevuto una risposta positiva dal backend
      },
      error: (error: any) => {
        console.error('Errore durante l\'invio della recensione:', error);
        // Gestisci l'errore adeguatamente, ad esempio mostrando un messaggio di errore all'utente
        if (error.status === 500) {
          // Mostra un messaggio di errore generico
          // Nota: potresti voler fornire un messaggio più descrittivo o gestire diversi tipi di errori separatamente
          alert('Si è verificato un errore durante l\'invio della recensione. Si prega di riprovare più tardi.');
        }
      }
    });
  }
}
