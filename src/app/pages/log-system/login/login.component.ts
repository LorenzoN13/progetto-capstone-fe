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
  loading!:boolean;

  failedLogin!: boolean;
  notExist!: boolean;

  constructor(
    private fb:FormBuilder,
    private LSS:LogSystemService,
    private router:Router,
    private RolesSVC:RuoliService
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      username: this.fb.control(null,[Validators.required]),
      password: this.fb.control(null,[Validators.required]),
    })
  }

  submit() {
    this.loading = true;
    this.LSS.login(this.form.value)
      .pipe(
        tap(() => {
          this.loading = false;
          this.router.navigate([``]);
        }),
        catchError(error => {
          this.loading = false;
          switch (error.error) {
            case "Cannot find user":
              this.notExist = true;
              break;
            default:
              this.failedLogin = true;
              break;
          }
          throw error;
        })
      )
      .subscribe(data => {
        // Verifica che data e data.obj non siano undefined
        if (data && data.obj && data.obj.id) {
          // Accedi all'id dell' data.obj

        } else {
          console.error("Impossibile accedere all'id dell'utente 'data.obj': 'data.obj' o 'id' è undefined.");
          // Gestisci il caso in cui data, data.obj o data.obj.id sono undefined
        }
      });
  }
}
