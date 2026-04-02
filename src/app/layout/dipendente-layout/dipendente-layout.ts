import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { UtenteCorrenteService } from '../../servizi/utente-corrente';

@Component({
  selector: 'app-dipendente-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dipendente-layout.html',
  styleUrl: './dipendente-layout.css',
})
export class DipendenteLayout {
  private router = inject(Router);
  private auth = getAuth();
  utenteCorrenteService = inject(UtenteCorrenteService);

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
