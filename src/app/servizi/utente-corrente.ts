import { Injectable, signal } from '@angular/core';
import { Utente } from '../model/utente';

@Injectable({
  providedIn: 'root',
})
export class UtenteCorrenteService {
  utenteCorrente = signal<Utente | null>(null);

  setUtente(utente: Utente) {
    this.utenteCorrente.set(utente);
  }

  pulisciUtente() {
    this.utenteCorrente.set(null);
  }
}
