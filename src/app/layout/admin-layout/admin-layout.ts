import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { UtenteCorrenteService } from '../../servizi/utente-corrente'; // ← AGGIUNGI

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private router = inject(Router); // ← cambia da constructor
  private auth = getAuth();
  utenteCorrenteService = inject(UtenteCorrenteService); // ← AGGIUNGI

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
