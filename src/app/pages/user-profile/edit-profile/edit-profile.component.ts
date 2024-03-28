import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IutenteAuth } from '../../../Modules/iutente-auth';
import { Iruolo } from '../../../Modules/iruolo';
import { LogSystemService } from '../../../services/log-system.service';
import { RuoliService } from '../../../services/ruoli.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  @Input() editMode!:boolean;

  regExPassword:string=`^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$`
  form!: FormGroup;
  confirmPassword!:string;
  loading!:boolean;
  userAuth:IutenteAuth|undefined;
  admin!:boolean;
  userRole!:Iruolo;

  constructor(
    private fb:FormBuilder,
    private LSS:LogSystemService,
    private RolesSvc:RuoliService
    ){
    this.LSS.utente$.subscribe(user =>{
      if(!user)  return
      this.userAuth=user
    });
    this.RolesSvc.userRole$.subscribe(role =>{
      if(!role) return;
      this.userRole=role;
      this.admin=role.ruolo==`admin`?true:false
    });
  }

  ngOnInit(){
    if(!this.userAuth) return;
    this.form = this.fb.group({
      nome: this.fb.control(this.userAuth?.obj.nome,[Validators.required]),
      cognome: this.fb.control(this.userAuth?.obj.cognome,[Validators.required]),
      email: this.fb.control(this.userAuth?.obj.email,[Validators.email]),
      username: this.fb.control(this.userAuth?.obj.username,[Validators.required]),
      password: this.fb.control(null,[Validators.required,Validators.pattern(this.regExPassword)]),

    })
  }

  isValid(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.valid
  }

  isTouched(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.touched
  }

  isValidAndTouched(nameForm:string):boolean|undefined{
    return !this.isValid(nameForm) && this.isTouched(nameForm)
  }

  passwordMatchValidator=(formC:FormControl):ValidationErrors|null => {
    if(formC.value!=this.form?.get(`password`)?.value){
      return {
        invalid: true,
        message: `Passwords don't match`
      }
    }
    return null;
  }

  getCustomMessage(nameForm:string){
    return this.form.get(nameForm)?.errors!['message']
  }

  submit(){
    this.loading=true;
    if(!this.userAuth) return
    this.form.value.id=this.userAuth.obj.id
    this.userAuth.obj=this.form.value
    this.LSS.updateUser(this.userAuth).pipe(catchError(err=>{
      this.loading=false
      throw err;
    }))
    .subscribe(data=>{
      if(!this.userAuth) return;
      this.loading=false;
      this.userAuth.obj=data;
      localStorage.setItem('user', JSON.stringify(this.userAuth))
      window.location.reload();
    })
  }

  async adminSwitch(){
    const { value: password } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });
    if (password==`admin`) {
      this.userRole.ruolo=`admin`;
      this.RolesSvc.upgradeUserRole(this.userRole).subscribe(()=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Now you are an admin",
          showConfirmButton: false,
          timer: 3000
        });
      })

    }else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "EH! Volevi!",
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
}
