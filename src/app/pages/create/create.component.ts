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
  @Input() prodotto: Iprodotto = {
    immagineUrl: '',
    titolo: '',
    colore:'',
    quantita: 0,
    descrizione: '',
    brand: '',
    dimensione: '',
    categoria: '',
    prezzo: 0,
    id: 0
  };

  // Iniezione del servizio ProdottiService nel costruttore del componente
  constructor(private prodottoSvc: ProdottiService) {}

  // Metodo chiamato quando il modulo HTML associato è sottomesso
  submitForm() {
    // Chiama il metodo "createProduct" del servizio ProdottiService
    // per creare un nuovo prodotto con i dati inseriti nel form
    this.prodottoSvc.createProduct(this.prodotto)
      .subscribe({
        // Gestisce la risposta positiva dal backend
        next: (response: Iprodotto) => {
          console.log('Dati del prodotto inviati con successo:', response);
          // Puoi eseguire ulteriori operazioni dopo aver ricevuto una risposta positiva
        },
        // Gestisce eventuali errori durante l'invio dei dati al backend
        error: (error: any) => {
          console.error('Errore durante l\'invio dei dati del prodotto:', error);
          // Puoi gestire l'errore in diversi modi, ad esempio mostrando un messaggio all'utente
        }
      });
  }
}
