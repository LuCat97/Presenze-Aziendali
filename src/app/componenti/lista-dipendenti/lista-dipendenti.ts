import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UtentiService } from '../../servizi/utenti';

@Component({
  selector: 'app-lista-dipendenti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-dipendenti.html',
  styleUrl: './lista-dipendenti.css',
})
export class ListaDipendenti implements OnInit {
  private utentiService = inject(UtentiService);
  private cdr = inject(ChangeDetectorRef);

  utenti: any[] = [];

  ngOnInit(): void {
    this.caricaUtenti();
  }

  async caricaUtenti() {
    const utenti = await this.utentiService.getUtenti();
    this.utenti = utenti.filter((u: any) => u.ruolo?.toLowerCase().trim() === 'dipendente');
    this.cdr.detectChanges();
  }
}
