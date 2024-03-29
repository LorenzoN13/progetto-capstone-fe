import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { LogSystemService } from '../../../services/log-system.service';
import { RuoliService } from '../../../services/ruoli.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  loading!: boolean;
  failedLogin!: boolean;
  notExist!: boolean;

  constructor(
    private fb: FormBuilder,
    private LSS: LogSystemService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Inizializzazione del form con i campi username e password
    this.form = this.fb.group({
      username: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
    });
  }

  // Funzione per la gestione del submit del form
  submit(): void {
    // Impostazione del flag di caricamento a true
    this.loading = true;

    // Chiamata al servizio di login attraverso il LogSystemService
    this.LSS.login(this.form.value).pipe(
      tap(() => {
        // Se la chiamata ha successo, si imposta il flag di caricamento a false
        // e si reindirizza l'utente alla pagina principale
        this.loading = false;
        this.router.navigate(['']);
      }),
      catchError(error => {
        // Se si verifica un errore durante la chiamata al servizio di login,
        // si imposta il flag di caricamento a false e si gestisce l'errore
        this.loading = false;
        switch (error.error) {
          // Se l'errore indica che l'account non esiste, si imposta il flag "notExist" a true
          case 'Cannot find user':
            this.notExist = true;
            break;
          // Altrimenti, si imposta il flag "failedLogin" a true
          default:
            this.failedLogin = true;
            break;
        }
        // Si propaga l'errore per la gestione successiva, ad esempio per mostrare un messaggio all'utente
        throw error;
      })
    ).subscribe();
  }
}
