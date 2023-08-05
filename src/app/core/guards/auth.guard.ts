import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)
  return authService.autentification().pipe(map((auth) => {
    if(auth) return true;
    return router.createUrlTree(['/auth/login']);
  }));
};
