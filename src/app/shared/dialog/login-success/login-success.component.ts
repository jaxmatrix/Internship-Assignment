import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginSuccessComponent>,
  ){}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
