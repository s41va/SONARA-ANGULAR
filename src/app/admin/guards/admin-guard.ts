import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAdmin().pipe(
    map(isAdmin => {
      if (isAdmin) return true;
      router.navigate(['/']);  // redirige si no es admin
      return false;
    })
  );
};