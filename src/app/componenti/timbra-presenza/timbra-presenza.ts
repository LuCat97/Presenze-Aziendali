import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { PresenzeService } from '../../servizi/presenze';
import { UtentiService } from '../../servizi/utenti';

@Component({
  selector: 'app-timbra-presenza',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timbra-presenza.html',
  styleUrl: './timbra-presenza.css',
})
export class TimbraPresenza implements OnInit {
  private presenze = inject(PresenzeService);
  private utenti = inject(UtentiService);
  private cdr = inject(ChangeDetectorRef);

  uidDipendente = '';
  emailDipendente = '';
  nomeDipendente = '';
  messaggio = '';
  giaTimbrato = false;

  ngOnInit(): void {
    this.caricaUtenteCorrente();
  }

  async caricaUtenteCorrente() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.uidDipendente = user.uid;
      this.emailDipendente = user.email || '';

      const utenteDb = await this.utenti.getUtenteByUid(user.uid);

      if (utenteDb) {
        this.nomeDipendente = (utenteDb as any)?.nome || '';
      }

      const oggi = new Date().toISOString().split('T')[0];
      this.giaTimbrato = await this.presenze.presenzaEsiste(this.uidDipendente, oggi);
    }

    this.cdr.detectChanges();
  }

  async timbraPresenza() {
    const oggi = new Date().toISOString().split('T')[0];

    const presenza = {
      uidDipendente: this.uidDipendente,
      nomeDipendente: this.nomeDipendente,
      emailDipendente: this.emailDipendente,
      data: oggi,
      stato: 'presente',
    };

    await this.presenze.aggiungiPresenza(presenza);
    this.giaTimbrato = true;
    this.messaggio = 'Presenza timbrata con successo';
    this.cdr.detectChanges();
  }
}
