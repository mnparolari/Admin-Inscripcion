import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionService } from '../services/inscription.service';
import { Store } from '@ngrx/store';


@Injectable()
export class InscriptionEffects {
  constructor(private actions$: Actions, private inscriptionService: InscriptionService, private store: Store) { }

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionService.getInscriptionsFromDB().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadCoursesOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadCoursesOptions),
      concatMap(() =>
        this.inscriptionService.getCoursesOptions().pipe(
          map(data => InscriptionActions.loadCoursesOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadCoursesOptionsFailure({ error }))))
      )
    );
  });

  loadStudentsOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadStudentsOptions),
      concatMap(() =>
        this.inscriptionService.getStudentsOptions().pipe(
          map(data => InscriptionActions.loadStudentsOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadStudentsOptionsFailure({ error }))))
      )
    );
  });

  loadCreateInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadCreateInscription),
      concatMap((action) =>
        this.inscriptionService.getCreateInscription(action.payload).pipe(
          map(data => InscriptionActions.loadCreateInscriptionSuccess({ data })),
          catchError(error => of(InscriptionActions.loadCreateInscriptionFailure({ error }))))
      )
    );
  });

  loadCreateInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadCreateInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });

  loadDeleteInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadDeleteInscription),
      concatMap((action) =>
        this.inscriptionService.getDeleteInscription(action.data).pipe(
          map(() => InscriptionActions.loadDeleteInscriptionSuccess({ data: action.data })),
          catchError(error => of(InscriptionActions.loadDeleteInscriptionFailure({ error }))))
      )
    );
  });

  loadDeleteInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadDeleteInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });

  loadUpdateInscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscriptionActions.loadUpdateInscription),
      concatMap((action) =>
        this.inscriptionService.updateInscription(action.payload).pipe(
          map(() => InscriptionActions.loadUpdateInscriptionSuccess({ data: action.payload })),
          catchError(error => of(InscriptionActions.loadUpdateInscriptionFailure({ error })))
        )
      )
    )
  );

  loadUpdateInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadUpdateInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });
}
