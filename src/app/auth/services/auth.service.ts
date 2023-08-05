import { Injectable } from '@angular/core';
import { LoginPayload } from '../models/auth';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Users } from 'src/app/dashboard/pages/users/models/user';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<Users | null>(null);
  public _authUser$ = this.authUser$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient, private router: Router) { }

  autentification(): Observable<boolean> {
    return this._authUser$.pipe(take(1), map((user) => !!user));
  };

  login(payload: LoginPayload): void {
    this.httpClient.get<Users[]>(' http://localhost:3000/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          this.authUser$.next(response[0]);
          this.router.navigate(['/dashboard']);
        } else {
          this.notifier.showError('Usuario o contraseña inválida', 'Intentá nuevamente');
          this.authUser$.next(null);
        }
      }
    })
  };
}
