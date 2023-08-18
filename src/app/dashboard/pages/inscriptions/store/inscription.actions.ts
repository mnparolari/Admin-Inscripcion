import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { DataInscription, Inscription, InscriptionPayload } from '../models/inscription';
import { Course } from '../../courses/models/course';
import { Student } from '../../students/models/student';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: DataInscription[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses Options': emptyProps(),
    'Load Courses Options Success': props<{ data: Course[] }>(),
    'Load Courses Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Students Options': emptyProps(),
    'Load Students Options Success': props<{ data: Student[] }>(),
    'Load Students Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Create Inscription': props<{ payload: InscriptionPayload }>(),
    'Load Create Inscription Success': props<{ data: Inscription }>(),
    'Load Create Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Load Delete Inscription': props<{ data: number }>(),
    'Load Delete Inscription Success': props<{ data: number }>(),
    'Load Delete Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Load Update Inscription': props<{ payload: Inscription }>(),
    'Load Update Inscription Success': props<{ data: Inscription }>(),
    'Load Update Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});