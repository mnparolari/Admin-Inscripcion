import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectInscriptions = createSelector(selectInscriptionState, (state) => state.data)
export const selectCoursesOptions = createSelector(selectInscriptionState, (state) => state.CoursesOptions)
export const selectStudentsOptions = createSelector(selectInscriptionState, (state) => state.StudentsOptions)