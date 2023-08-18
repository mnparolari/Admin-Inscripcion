import { Injectable } from '@angular/core';
import { LoginPayload } from '../models/auth';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models/user';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private notifier: NotifierService, private httpClient: HttpClient, private router: Router, private store: Store) { }

  autentification(): Observable<boolean> {
    return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((result) => {
        if (result.length) {
          const authUser = result[0];
          this.store.dispatch(authActions.setAuthUser({payload: authUser}));
        }
        return !!result.length
      })
    );
  };

  login(payload: LoginPayload): void {
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this.store.dispatch(authActions.setAuthUser({payload: authUser}));
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', authUser.token);
        } else {
          this.notifier.showError('Usuario o contraseña inválida', 'Intentá nuevamente');
          this.store.dispatch(authActions.setAuthUser({payload: null}));
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500)
            this.notifier.showError('Ocurrió un error inesperado', 'Por favor, volvé a intentarlo.')
        }
        if (err.status === 403)
          this.notifier.showError('Acceso denegado', 'No tenes acceso a esta parte del sitio')
      }
    })
  };

  public logout(): void {
    this.store.dispatch(authActions.setAuthUser({payload: null}));
  }
}
