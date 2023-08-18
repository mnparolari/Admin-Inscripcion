import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inscription } from '../../models/inscription';
import { Store } from '@ngrx/store';
import { InscriptionActions } from '../../store/inscription.actions';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Course } from '../../../courses/models/course';
import { selectCoursesOptions, selectStudentsOptions } from '../../store/inscription.selectors';
import { Student } from '../../../students/models/student';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InscriptionService } from '../../services/inscription.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-inscriptions-dialog',
  templateUrl: './inscriptions-dialog.component.html',
  styleUrls: ['./inscriptions-dialog.component.scss']
})
export class InscriptionsDialogComponent implements OnInit {

  inscription: Inscription;
  isEditing: boolean;

  courseId = new FormControl<number | null>(null, [Validators.required]);
  studentId = new FormControl<number | null>(null, [Validators.required]);

  inscriptionForm = new FormGroup({
    courseId: this.courseId,
    studentId: this.studentId
  });

  coursesOptions$: Observable<Course[]>;
  studentsOptions$: Observable<Student[]>;


  constructor(private store: Store, private matDialogRef: MatDialogRef<InscriptionsDialogComponent>, private inscriptionService: InscriptionService, private notifier: NotifierService,
    @Inject(MAT_DIALOG_DATA) public data: { inscription: Inscription; isEditing: boolean }) {
    this.coursesOptions$ = this.store.select(selectCoursesOptions);
    this.studentsOptions$ = this.store.select(selectStudentsOptions);

    this.isEditing = data.isEditing;
    this.inscription = data.inscription || { id: 0, courseId: null, studentId: null };

    this.inscriptionForm.setValue({
      courseId: this.inscription.courseId,
      studentId: this.inscription.studentId
    });
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadCoursesOptions());
    this.store.dispatch(InscriptionActions.loadStudentsOptions());
  }

  onToggleChangeCourse(course: Course): void {
    this.inscriptionForm.patchValue({
      courseId: course.id !== undefined ? course.id : null
    });
  }

  onToggleChangeStudent(student: Student): void {
    this.inscriptionForm.patchValue({
      studentId: student.id !== undefined ? student.id : null
    });
  }

  get firstStepComplete(): boolean {
    return this.courseId.valid
  }

  get secondStepComplete(): boolean {
    return this.studentId.valid
  }

  getErrorMessage() {
    if (this.courseId.hasError('required') || this.studentId.hasError('required')) {
      return '* Este campo es requerido';
    }
    return '* Este campo es requerido';
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      const updatedInscription: Inscription = {
        ...this.inscription,
        courseId: this.inscriptionForm.get('courseId')?.value ?? 0,
        studentId: this.inscriptionForm.get('studentId')?.value ?? 0
      };

      if (this.isEditing) {
        this.inscriptionService.updateInscription(updatedInscription)
          .pipe(
            tap(() => {
              this.store.dispatch(InscriptionActions.loadUpdateInscriptionSuccess({ data: updatedInscription }));
              this.matDialogRef.close();
              this.notifier.showSucces('Inscripción modificada', 'La inscripción se modificó correctamente');
            })
          ).subscribe();
      } else {
        this.store.dispatch(InscriptionActions.loadCreateInscription({ payload: updatedInscription }));
        this.matDialogRef.close();
        this.notifier.showSucces('Inscripción creada', 'La inscripción fue creada correctamente')
      }
    }
  }
}
