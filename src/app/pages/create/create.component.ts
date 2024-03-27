import { Component, Input } from '@angular/core';
import { Iprodotto } from '../../Modules/iprodotto';
import { ProdottiService } from '../../services/prodotti.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  @Input() prodotto!:Iprodotto;

constructor(
  private prodottoSvc:ProdottiService
){}

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
