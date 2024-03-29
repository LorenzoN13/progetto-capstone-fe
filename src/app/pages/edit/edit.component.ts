import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Iprodotto } from '../../Modules/iprodotto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { IProdottoByIdResponse } from '../../Modules/i-prodotto-by-id-response';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  prodottoForm: FormGroup; // Definizione del FormGroup per gestire i dati del form
  prodottoId!: number; // ID del prodotto da modificare
  prodotto!: Iprodotto; // Oggetto prodotto da modificare

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private prodottoSvc: ProdottiService // Iniezione del servizio ProdottiService per effettuare operazioni CRUD sui prodotti
  ){

    // Inizializzazione del FormGroup con i campi del form
    this.prodottoForm = this.formBuilder.group({
      id: [''],
      titolo: [''],
      brand: [''],
      colore:[''],
      descrizione: [''],
      prezzo: [''],
      immagineUrl: [''],
      quantita: [''],
      categoria:[''],
      dimensione: [''],
    });
  }

  ngOnInit(): void {
    // Recupero l'ID del prodotto dalla route
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.prodottoId = +idString;
        // Chiamo la funzione per ottenere i dettagli del prodotto
        this.getProdottoDetails();
      } else {
        console.error('ID del prodotto non presente nei parametri');
      }
    });
  }

  // Funzione per ottenere i dettagli del prodotto dal servizio ProdottiService
  getProdottoDetails(): void {
    this.prodottoSvc.getProdottoById(this.prodottoId).subscribe({
      next: (prodotto: IProdottoByIdResponse) => {
        console.log('Prodotto ottenuto:', prodotto); // Debug: verifica i dati del prodotto ottenuti dal servizio
        this.prodotto = prodotto.obj;
        // Popola il form con i dettagli del prodotto
        this.populateForm();
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli del prodotto:', error);
      }
    });
  }

  // Funzione per popolare il form con i dettagli del prodotto
  populateForm(): void {
    if (this.prodotto) {
      this.prodottoForm.patchValue({
        id: this.prodotto.id,
        titolo: this.prodotto.titolo,
        brand: this.prodotto.brand,
        colore: this.prodotto.colore,
        descrizione: this.prodotto.descrizione,
        prezzo: this.prodotto.prezzo,
        immagineUrl: this.prodotto.immagineUrl,
        quantita: this.prodotto.quantita,
        categoria: this.prodotto.categoria,
        dimensione: this.prodotto.dimensione
      });
      console.log('Form popolato:', this.prodottoForm.value);
    } else {
      console.error('Impossibile popolare il form: dati del prodotto mancanti');
    }
  }

  // Funzione chiamata quando viene premuto il pulsante "Salva" per aggiornare il prodotto
  onSave(): void {
    const updatedData: Partial<Iprodotto> = this.prodottoForm.value; // Ottieni i dati aggiornati dal form

    const updatedProdotto: Iprodotto = { ...this.prodotto, ...updatedData }; // Combina i dati aggiornati con quelli esistenti del prodotto

    // Chiamata al servizio ProdottiService per aggiornare il prodotto nel backend
    this.prodottoSvc.updateProdotto(this.prodottoId, updatedProdotto).subscribe({
      next: (updatedProdotto: Iprodotto) => {
        console.log('Il prodotto è stato aggiornato con successo:', updatedProdotto);
        // Reindirizza l'utente alla pagina dei dettagli del prodotto aggiornato
        this.router.navigate(['/details/', this.prodottoId]);
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento del prodotto:', error);
      }
    });
  }
}
