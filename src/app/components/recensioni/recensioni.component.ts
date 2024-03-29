import { Component, Input } from '@angular/core';
import { Irecensione } from '../../Modules/irecensione';
import { RecensioniService } from '../../services/recensioni.service';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrl: './recensioni.component.scss'
})
export class RecensioniComponent {
 recensioni: Irecensione[] = [];

 constructor(private RecensioniSvc: RecensioniService){}

 ngOnInit(): void{
  this.fetchRecensioni();
 }

 fetchRecensioni(): void{
  this.RecensioniSvc.getRecensioni().subscribe({
    next: (response: any) => {
      if (response && response.obj && response.obj.content) {
        this.recensioni = response.obj.content;
      } else {
        console.error('Struttura dati non valida nella risposta del server.');
      }
    },
    error: (error) => {
      console.error('Errore nel recupero della recensione:', error);
    }
  });
 }

 
}
