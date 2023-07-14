import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Users } from '../../models/user';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class FormDialogComponent {

  /*firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  constructor(private _formBuilder: FormBuilder) { }*/
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  surname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required, Validators.maxLength(12)]);
  email = new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]);
  userType = new FormControl('');

  userForm = new FormGroup({
    name: this.name,
    surname: this.surname,
    phone: this.phone,
    email: this.email,
    password: this.password,
    userType: this.userType,
  });

  types: string[] = ["Profesor", "Estudiante"];

  get firstStepComplete(): boolean {
    return this.name.valid && this.surname.valid && this.phone.valid
  }

  get secondStepComplete(): boolean {
    return this.email.valid && this.password.valid
  }

  get thirdStepComplete(): boolean {
    return this.userType.valid
  }

  hide = true;

  getErrorMessage() {
    if (this.name.hasError('required') || this.surname.hasError('required') || this.phone.hasError('required') || this.email.hasError('required') || this.password.hasError('required') || this.userType.hasError('required')) {
      return 'Este campo es requerido';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Users
  ) {
    if (this.data) {
      this.name.setValue(this.data.name);
      this.surname.setValue(this.data.surname);
      this.password.setValue(this.data.password);
      this.email.setValue(this.data.email);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
  
}
