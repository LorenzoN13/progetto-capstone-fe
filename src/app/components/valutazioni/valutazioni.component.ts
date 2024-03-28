import { Component } from '@angular/core';
import { Ivalutazioni } from '../../Modules/ivalutazioni';
import { ValutazioniService } from '../../services/valutazioni.service';

@Component({
  selector: 'app-valutazioni',
  templateUrl: './valutazioni.component.html',
  styleUrl: './valutazioni.component.scss'
})
export class ValutazioniComponent {
valutazioni:Ivalutazioni[] = [];

constructor(private ValutazioniSvc:ValutazioniService){}

ngOnInit(): void{
  this.fetchValutazioni();
 }

 fetchValutazioni(): void{
  this.ValutazioniSvc.getValutazioni().subscribe({
    next: (response: any) => {
      if (response && response.obj && response.obj.content) {
        this.valutazioni = response.obj.content;
      } else {
        console.error('Struttura dati non valida nella risposta del server.');
      }
    },
    error: (error) => {
      console.error('Errore nel recupero della valutazione:', error);
    }
  });
 }
}
