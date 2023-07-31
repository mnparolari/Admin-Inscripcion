import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Students } from '../../models/students';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./students-dialog.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class StudentsDialogComponent {
  hide = true;

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  surname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required, Validators.maxLength(12)]);
  email = new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]);

  studentForm = new FormGroup({
    name: this.name,
    surname: this.surname,
    phone: this.phone,
    email: this.email,
    password: this.password,
  });

  get firstStepComplete(): boolean {
    return this.name.valid && this.surname.valid && this.phone.valid
  }

  get secondStepComplete(): boolean {
    return this.email.valid && this.password.valid
  };

  getErrorMessage() {
    if (this.name.hasError('required') || this.surname.hasError('required') || this.phone.hasError('required') || this.email.hasError('required') || this.password.hasError('required')) {
      return 'Este campo es requerido';
    }
    return this.email.hasError('email') ? 'No es un mail válido' : '';
  };

  constructor(
    private dialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Students
  ) {
    if (this.data) {
      this.name.setValue(this.data.name);
      this.surname.setValue(this.data.surname);
      this.password.setValue(this.data.password);
      this.email.setValue(this.data.email);
    }
  };

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  };

}
