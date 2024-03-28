import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ivalutazioni } from '../../../Modules/ivalutazioni';
import { LogSystemService } from '../../../services/log-system.service';
import { ActivatedRoute } from '@angular/router';
import { ValutazioniService } from '../../../services/valutazioni.service';
import { IutenteAuth } from '../../../Modules/iutente-auth';

@Component({
  selector: 'app-crea-valutazione',
  templateUrl: './crea-valutazione.component.html',
  styleUrl: './crea-valutazione.component.scss'
})
export class CreaValutazioneComponent implements OnInit{
  isLogged: boolean = false;
  @Input() prodottoId!: number;
  recensioneForm!: FormGroup;
  utenteId: number | undefined;
  valutazione: Ivalutazioni = {
    valutazione: 0,
    idUtente: 0,
    idProdotto: 0
  };

  constructor(
    private formBuilder: FormBuilder,
    private valutazioneSvc: ValutazioniService,
    private logService: LogSystemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recensioneForm = this.formBuilder.group({
      valutazione: [0, Validators.required]
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
        console.log('ID della valutazione recuperata:', this.prodottoId);
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

    this.valutazione.idUtente = this.utenteId;
    this.valutazione.idProdotto = this.prodottoId;
    console.log('Dati della recensione da inviare:', this.valutazione);

    this.valutazioneSvc.createValutazione(this.valutazione).subscribe({
      next: (response: Ivalutazioni) => {
        console.log('Valutazione inviata con successo:', response);
        // Puoi fare ulteriori operazioni dopo aver ricevuto una risposta positiva dal backend
      },
      error: (error: any) => {
        console.error('Errore durante l\'invio della valutazione:', error);
        // Gestisci l'errore adeguatamente, ad esempio mostrando un messaggio di errore all'utente
        if (error.status === 500) {
          // Mostra un messaggio di errore generico
          // Nota: potresti voler fornire un messaggio più descrittivo o gestire diversi tipi di errori separatamente
          alert('Si è verificato un errore durante l\'invio della valutazione. Si prega di riprovare più tardi.');
        }
      }
    });
  }
}
