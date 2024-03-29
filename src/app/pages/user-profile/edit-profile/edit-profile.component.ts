import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IutenteAuth } from '../../../Modules/iutente-auth';
import { Iruolo } from '../../../Modules/iruolo';
import { LogSystemService } from '../../../services/log-system.service';
import { RuoliService } from '../../../services/ruoli.service';
import { catchError, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  // Input che indica se il componente è in modalità di modifica
  @Input() editMode!: boolean;

  // Espressione regolare per la validazione della password
  regExPassword: string = `^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$`;

  // FormGroup per il form di registrazione/aggiornamento
  form!: FormGroup;

  // Variabili per gestire lo stato del componente
  confirmPassword!: string;
  loading!: boolean;
  userAuth: IutenteAuth | undefined;
  admin!: boolean;
  userRole!: Iruolo;

  constructor(
    private fb: FormBuilder,
    private LSS: LogSystemService,
    private RolesSvc: RuoliService
  ) {
    // Sottoscrizione all'observable per ottenere l'utente autenticato
    this.LSS.utente$.subscribe(user => {
      if (!user) return;
      this.userAuth = user;
    });

    // Sottoscrizione all'observable per ottenere il ruolo dell'utente
    this.RolesSvc.userRole$.subscribe(role => {
      if (!role) return;
      this.userRole = role;
      this.admin = role.ruolo == `admin` ? true : false;
    });
  }

  ngOnInit() {
    // Inizializzazione del form con i dati dell'utente autenticato
    if (!this.userAuth) return;
    this.form = this.fb.group({
      nome: this.fb.control(this.userAuth?.obj.nome, [Validators.required]),
      cognome: this.fb.control(this.userAuth?.obj.cognome, [Validators.required]),
      email: this.fb.control(this.userAuth?.obj.email, [Validators.email]),
      username: this.fb.control(this.userAuth?.obj.username, [Validators.required]),
      password: this.fb.control(null, [Validators.required, Validators.pattern(this.regExPassword)]),
    });
  }

  // Metodo per verificare se un campo del form è valido
  isValid(nameForm: string): boolean | undefined {
    return this.form.get(nameForm)?.valid;
  }

  // Metodo per verificare se un campo del form è stato toccato
  isTouched(nameForm: string): boolean | undefined {
    return this.form.get(nameForm)?.touched;
  }

  // Metodo per verificare se un campo del form non è valido ed è stato toccato
  isValidAndTouched(nameForm: string): boolean | undefined {
    return !this.isValid(nameForm) && this.isTouched(nameForm);
  }

  // Validatore custom per verificare se la conferma della password corrisponde alla password
  passwordMatchValidator = (formC: FormControl): ValidationErrors | null => {
    if (formC.value != this.form?.get(`password`)?.value) {
      return {
        invalid: true,
        message: `Le password non corrispondono`
      };
    }
    return null;
  }

  // Metodo per ottenere un messaggio custom per un campo del form
  getCustomMessage(nameForm: string) {
    return this.form.get(nameForm)?.errors!['message'];
  }

  // Metodo chiamato quando viene inviato il form
  submit() {
    this.loading = true;
    if (!this.userAuth) return;

    // Aggiunta dell'id dell'utente all'oggetto dati del form
    this.form.value.id = this.userAuth.obj.id;
    this.userAuth.obj = this.form.value;

    // Invio dei dati aggiornati al server
    this.LSS.updateUser(this.userAuth).pipe(
      catchError(err => {
        this.loading = false;
        throw err;
      })
    ).subscribe(data => {
      if (!this.userAuth) return;

      // Aggiornamento dei dati dell'utente autenticato e del localStorage
      this.loading = false;
      this.userAuth.obj = data;
      localStorage.setItem('user', JSON.stringify(this.userAuth));
      window.location.reload(); // Ricarica la pagina per applicare i cambiamenti
    });
  }
}

