import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogSystemService } from '../../../services/log-system.service';
import { RuoliService } from '../../../services/ruoli.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // Dichiarazione di variabili di classe
  confirmPassword!: string;
  form!: FormGroup;
  loading!: boolean;
  emailExist: boolean = false;
  regExPassword: string = `^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$`;

  constructor(
    private fb: FormBuilder,
    private LSS: LogSystemService,
    private router: Router
  ){}

  ngOnInit() {
    // Inizializzazione del form con i suoi controlli e le relative validazioni
    this.form = this.fb.group({
      nome: this.fb.control(null, [Validators.required]),
      cognome: this.fb.control(null, [Validators.required]),
      username: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required, Validators.pattern(this.regExPassword)]),
      confirmPassword: this.fb.control (null, [Validators.required, this.passwordMatchValidator] as Validators)
    })
  }

  // Funzione per la gestione della registrazione dell'utente
  submit() {
    // Formattazione dei campi "nome" e "cognome"
    this.form.value.nome = this.form.value.nome.charAt(0).toUpperCase() + this.form.value.nome.slice(1).toLowerCase();
    this.form.value.cognome = this.form.value.cognome.charAt(0).toUpperCase() + this.form.value.cognome.slice(1).toLowerCase();

    // Impostazione del flag `loading` su `true` per indicare il caricamento in corso
    this.loading = true;

    // Rimozione del campo `confirmPassword` per evitare che venga inviato al backend
    delete this.form.value.confirmPassword;

    // Registrazione del nuovo utente tramite il servizio LogSystemService
    this.LSS.register(this.form.value).pipe(
      catchError(err => {
        // Gestione degli errori
        this.loading = false; // Impostazione del flag `loading` su `false`
        if (err.status === 409) {
          // Se il backend restituisce un errore 409 (conflitto), significa che l'email esiste già
          this.emailExist = true;
        } else {
          // Altrimenti, mostra un messaggio generico di errore
          console.error('Errore durante la registrazione:', err);
        }
        throw err;
      })
    ).subscribe(data => {
      // Sottoscrizione alla risposta della registrazione
      if (data && data.obj && data.obj.id) {
        // Controllo se sono stati ricevuti dati utente validi
        console.log('Registrazione completata con successo. ID utente:', data.obj.id);
        // Reindirizzamento alla pagina di login
        this.router.navigate(['/LogSystem/login']);
      } else {
        // Gestione dell'errore quando i dati utente sono mancanti o non validi
        console.error('Errore: dati utente non validi', data);
      }
      // Impostazione del flag `loading` su `false` per indicare la fine del caricamento
      this.loading = false;
    });
  }

  // Funzione per verificare se un campo del form è valido
  isValid(nameForm: string): boolean | undefined {
    return this.form.get(nameForm)?.valid;
  }

  // Funzione per verificare se un campo del form è stato toccato
  isTouched(nameForm: string): boolean | undefined {
    return this.form.get(nameForm)?.touched;
  }

  // Funzione per verificare se un campo del form è sia toccato che non valido
  isValidAndTouched(nameForm: string): boolean | undefined {
    return !this.isValid(nameForm) && this.isTouched(nameForm);
  }

  // Funzione per la validazione della corrispondenza tra password e conferma password
  passwordMatchValidator = (formC: FormControl): ValidationErrors | null => {
    if (formC.value != this.form?.get(`password`)?.value) {
      return {
        invalid: true,
        message: 'Le password sono diverse!!'
      };
    }
    return null;
  }

  // Funzione per ottenere un messaggio di errore personalizzato per il campo specificato
  getCustomMessage(nameForm: string) {
    return this.form.get(nameForm)?.errors!['message'];
  }
}
