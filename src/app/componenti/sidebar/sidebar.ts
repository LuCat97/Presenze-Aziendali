import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UtenteCorrenteService } from '../../servizi/utente-corrente';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private router = inject(Router);
  utenteCorrenteService = inject(UtenteCorrenteService);

  vaiA(url: string) {
    this.router.navigate([url]);
  }
}
