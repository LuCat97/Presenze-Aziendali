import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UtentiService } from '../servizi/utenti';

export const dipendenteGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const utenti = inject(UtentiService);
  const auth = getAuth();

  const user = auth.currentUser;

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const utenteDb = await utenti.getUtenteByUid(user.uid);
  const ruolo = (utenteDb as any)?.ruolo?.toLowerCase().trim();

  if (ruolo === 'dipendente') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
