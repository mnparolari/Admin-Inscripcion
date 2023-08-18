import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/dashboard/pages/users/models/user";
import { authActions } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: User | null;
};

const initialState: AuthState = {
    authUser: null
}

export const authReducer = createReducer(initialState, 
    on(authActions.setAuthUser, (currentState, action) => {
    return {
        authUser: action.payload
    }
}))