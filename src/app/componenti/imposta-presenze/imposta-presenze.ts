import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PresenzeService } from '../../servizi/presenze';
import { UtentiService } from '../../servizi/utenti';

@Component({
  selector: 'app-imposta-presenze',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imposta-presenze.html',
  styleUrl: './imposta-presenze.css',
})
export class ImpostaPresenze implements OnInit {
  private utenti = inject(UtentiService);
  private presenze = inject(PresenzeService);
  private cdr = inject(ChangeDetectorRef);

  dipendenti: any[] = [];
  presenzeOggi: any[] = [];
  messaggio = '';
  presentiOggi: string[] = [];

  ngOnInit(): void {
    this.caricaDipendenti();
    this.caricaPresenzeOggi();
  }

  async caricaDipendenti() {
    const utenti = await this.utenti.getUtenti();
    this.dipendenti = utenti.filter((u: any) => u.ruolo?.toLowerCase().trim() === 'dipendente');
    this.cdr.detectChanges();
  }

  async caricaPresenzeOggi() {
    const oggi = new Date().toISOString().split('T')[0];
    this.presenzeOggi = await this.presenze.getPresenzePerData(oggi);
    this.presentiOggi = this.presenzeOggi.map((p: any) => p.uidDipendente);
    this.cdr.detectChanges();
  }

  async segnaPresente(dipendente: any) {
    const oggi = new Date().toISOString().split('T')[0];

    const presenza = {
      uidDipendente: dipendente.uid,
      nomeDipendente: dipendente.nome,
      emailDipendente: dipendente.email,
      data: oggi,
      stato: 'presente',
    };

    await this.presenze.aggiungiPresenza(presenza);
    this.messaggio = `Presenza segnata per ${dipendente.nome}`;

    await this.caricaPresenzeOggi();
    this.cdr.detectChanges();
  }

  giaPresente(uid: string) {
    return this.presentiOggi.includes(uid);
  }
}
