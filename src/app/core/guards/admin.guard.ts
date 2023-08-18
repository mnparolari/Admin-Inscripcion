import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';
import { NotifierService } from '../services/notifier.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const notifier = inject(NotifierService)

  return inject(Store).select(selectAuthIsAdmin).pipe(
    map((admin) => {
      if (!admin) {
        notifier.showError('Acceso denegado', 'Para acceder a esta sección, necesitás tener el rol "Administrador"')
        return router.createUrlTree(['dashboard/home'])
      }
      return true;
    })
  );
};
