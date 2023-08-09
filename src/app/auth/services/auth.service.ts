import { Injectable } from '@angular/core';
import { LoginPayload } from '../models/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Users } from 'src/app/dashboard/pages/users/models/user';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<Users | null>(null);
  public _authUser$ = this.authUser$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient, private router: Router) { }

  autentification(): Observable<boolean> {
    return this.httpClient.get<Users[]>(environment.baseApiUrl + '/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((result) => {
        if (result.length) {
          const authUser = result[0];
          this.authUser$.next(authUser);
        }
        return !!result.length
      })
    );
  };

  login(payload: LoginPayload): void {
    this.httpClient.get<Users[]>(environment.baseApiUrl + '/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this.authUser$.next(authUser);
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', authUser.token);
        } else {
          this.notifier.showError('Usuario o contraseña inválida', 'Intentá nuevamente');
          this.authUser$.next(null);
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
}
