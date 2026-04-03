import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../servizi/autenticazione';
import { UtentiService } from '../../servizi/utenti';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AutenticazioneService);
  private utenti = inject(UtentiService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';
  errore = '';

  async login() {
    const emailPulita = this.email.trim();
    const passwordPulita = this.password.trim();

    if (!emailPulita.includes('@') || !emailPulita.includes('.')) {
      this.errore = 'Formato email non valido';
      return;
    }
    try {
      const credenziali = await this.auth.login(this.email, this.password);
      const uid = credenziali.user.uid;

      const utenteDb = await this.utenti.getUtenteByUid(uid);

      if (!utenteDb) {
        this.errore = 'Utente non trovato nel database';
        this.cdr.detectChanges();
        return;
      }

      const ruolo = (utenteDb as any)?.ruolo?.toLowerCase().trim();

      if (ruolo === 'admin') {
        this.router.navigate(['/admin']);
      } else if (ruolo === 'dipendente') {
        this.router.navigate(['/dipendente']);
      } else {
        this.errore = 'Ruolo non valido';
      }

      this.cdr.detectChanges();
    } catch (error: any) {
      console.error('ERRORE LOGIN FIREBASE:', error);
      this.errore = 'Errore login: Credenziali errate';
      this.cdr.detectChanges();
    }
  }
}
