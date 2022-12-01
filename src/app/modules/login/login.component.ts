import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginSuccessComponent } from 'src/app/shared/dialog/login-success/login-success.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required, Validators.minLength(6)])

  loginForm = new FormGroup({
    email: this.email,
    password: this.password

  })

   validForm = false;
   hide = true;

  constructor(
    public successDialog: MatDialog
  ) { }

   getErrorMessage() {
    if(this.email.hasError('required')) {
      return 'Email is required';
    }

   return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // check form and login but for now open dialog
  login() : void{
    const dialogRef = this.successDialog.open(LoginSuccessComponent, {
      width: '250px'
    });
  }

}
