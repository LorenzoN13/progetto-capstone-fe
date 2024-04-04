import { Component, Input } from '@angular/core';
import { Iprodotto } from '../../Modules/iprodotto';
import { ProdottiService } from '../../services/prodotti.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  // Dichiarazione della variabile di input "prodotto"
  // Inizializzata con un oggetto vuoto di tipo Iprodotto
  @Input() prodotto:Iprodotto = {
    immagineUrl: '',
    titolo: '',
    colore:'',
    quantita: 0,
    descrizione: '',
    brand: '',
    dimensione: '',
    categoria: '',
    prezzo:0,
    id:0
  };

  // Iniezione del servizio ProdottiService nel costruttore del componente
  constructor(private prodottoSvc: ProdottiService) {}

  // Metodo chiamato quando il modulo HTML associato è sottomesso
  submitForm() {
    this.prodottoSvc.createProduct(this.prodotto)
    .subscribe({
      next: (response: Iprodotto) => {
        console.log('Dati del prodotto inviati con successo:', response);
        // Puoi fare ulteriori operazioni dopo aver ricevuto una risposta positiva dal backend
      },
      error: (error: any) => {
        console.error('Errore durante l\'invio dei dati del prodotto:', error);
        // Gestisci l'errore adeguatamente, ad esempio mostrando un messaggio di errore all'utente
      }
    });
    }
}
