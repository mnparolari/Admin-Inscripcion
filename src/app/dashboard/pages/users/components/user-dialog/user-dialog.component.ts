import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './user-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-dialog.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})

export class UserDialogComponent {
  editingUser?: User;
  hide = true;

  name = new FormControl<string | ''>('', [Validators.required, Validators.minLength(2)]);
  surname = new FormControl<string | ''>('', [Validators.required]);
  phone = new FormControl<string | ''>('', [Validators.required, Validators.maxLength(12)]);
  email = new FormControl<string | ''>('', [Validators.required, Validators.minLength(2), Validators.email]);
  password = new FormControl<string | ''>('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]);
  userType = new FormControl<string | ''>('');

  userForm = new FormGroup({
    name: this.name,
    surname: this.surname,
    phone: this.phone,
    email: this.email,
    password: this.password,
    userType: this.userType,
  });

  types: string[] = ["Administrador", "Usuario"];

  get firstStepComplete(): boolean {
    return this.name.valid && this.surname.valid && this.phone.valid
  };

  get secondStepComplete(): boolean {
    return this.email.valid && this.password.valid
  };

  get thirdStepComplete(): boolean {
    return this.userType.valid
  };


  getErrorMessage() {
    if (this.name.hasError('required') || this.surname.hasError('required') || this.phone.hasError('required') || this.email.hasError('required') || this.password.hasError('required') || this.userType.hasError('required')) {
      return 'Este campo es requerido';
    }
    return this.email.hasError('email') ? 'No es un mail válido' : '';
  };

  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
    if (this.data) {
      this.editingUser = this.data;
      this.name.setValue(this.data.name);
      this.surname.setValue(this.data.surname);
      this.password.setValue(this.data.password);
      this.email.setValue(this.data.email);
    }
  };

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      const payloadToken: any = {
        ...this.userForm.value
      }
      if (this.editingUser) {
        payloadToken['token'] = this.editingUser.token;
      }
      this.dialogRef.close(payloadToken);
    }
  };

}
