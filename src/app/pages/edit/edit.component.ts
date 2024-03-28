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
  prodottoForm: FormGroup;
  prodottoId!: number;
  prodotto!: Iprodotto;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private prodottoSvc: ProdottiService
  ){

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
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.prodottoId = +idString;
        this.getProdottoDetails();
      } else {
        console.error('ID della birra non presente nei parametri');
      }
    });
  }

  getProdottoDetails(): void {
    this.prodottoSvc.getProdottoById(this.prodottoId).subscribe({
      next: (prodotto: IProdottoByIdResponse) => {
        console.log('Prodotto ottenuto:', prodotto); // Debug: verifica i dati del prodotto ottenuti dal servizio
        this.prodotto = prodotto.obj;
        this.populateForm();
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli del prodotto:', error);
      }
    });
  }
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

  onSave(): void {
    const updatedData: Partial<Iprodotto> = this.prodottoForm.value;

    const updatedProdotto: Iprodotto = { ...this.prodotto, ...updatedData };


    this.prodottoSvc.updateProdotto(this.prodottoId, updatedProdotto).subscribe({
      next: (updatedProdotto: Iprodotto) => {
        console.log('il prodotto è stato aggiornato con successo:', updatedProdotto);

        this.router.navigate(['/details/', this.prodottoId]);
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento del prodotto:', error);
      }
    });
  }

}
