import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { DataInscription } from '../models/inscription';
import { Student } from '../../students/models/student';
import { Course } from '../../courses/models/course';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  data: DataInscription[];
  StudentsOptions: Student[];
  CoursesOptions: Course[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: [],
  StudentsOptions: [],
  CoursesOptions: [],
  loading: false,
  error: null
};


export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),

  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(InscriptionActions.loadCoursesOptions, (state) => state),
  on(InscriptionActions.loadCoursesOptionsSuccess, (state, action) => {
    return {
      ...state,
      CoursesOptions: action.data,
      loading: false
    }
  }),

  on(InscriptionActions.loadCoursesOptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(InscriptionActions.loadStudentsOptions, (state) => state),
  on(InscriptionActions.loadStudentsOptionsSuccess, (state, action) => {
    return {
      ...state,
      StudentsOptions: action.data,
      loading: false
    }
  }),

  on(InscriptionActions.loadCoursesOptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(InscriptionActions.loadDeleteInscription, (state, { data }) => ({
    ...state,
    data: state.data.filter(inscription => inscription.id !== data)
  })),

  on(InscriptionActions.loadUpdateInscriptionSuccess, (state, action) => {
    const updatedInscription = action.data;

    const updatedData = state.data.map(inscription => {
      if (inscription.id === updatedInscription.id) {
        const updatedDataInscription: DataInscription = {
          ...inscription,
          courseId: updatedInscription.courseId,
          studentId: updatedInscription.studentId
        };
        return updatedDataInscription;
      }
      return inscription;
    });

    return {
      ...state,
      data: updatedData
    };
  }),
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

