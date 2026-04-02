import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = getAuth();

  if (auth.currentUser) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
