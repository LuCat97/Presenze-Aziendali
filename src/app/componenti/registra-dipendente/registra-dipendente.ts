import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utente } from '../../model/utente';
import { AutenticazioneService } from '../../servizi/autenticazione';
import { UtentiService } from '../../servizi/utenti';

@Component({
  selector: 'app-registra-dipendente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registra-dipendente.html',
  styleUrl: './registra-dipendente.css',
})
export class RegistraDipendente {
  private fb = inject(FormBuilder);
  private autenticazioneService = inject(AutenticazioneService);
  private utentiService = inject(UtentiService);
  private router = inject(Router);

  errore = '';
  messaggio = '';
  isLoading = false;

  formRegistrazione = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    ruolo: ['dipendente', Validators.required],
  });

  async onRegistra() {
    this.errore = '';
    this.messaggio = '';

    if (this.formRegistrazione.invalid) {
      this.formRegistrazione.markAllAsTouched();
      this.errore = 'Compila correttamente tutti i campi';
      return;
    }

    const nome = this.formRegistrazione.value.nome?.trim() ?? '';
    const email = this.formRegistrazione.value.email?.trim() ?? '';
    const password = this.formRegistrazione.value.password ?? '';
    const ruolo = (this.formRegistrazione.value.ruolo ?? 'dipendente') as 'dipendente' | 'admin';

    this.isLoading = true;

    try {
      const credenziali = await this.autenticazioneService.registraAdmin(nome, email, password);

      const nuovoUtente: Utente = {
        uid: credenziali.user.uid,
        nome: nome,
        email: email,
        ruolo: ruolo,
      };

      await this.utentiService.salvaUtente(nuovoUtente);

      this.messaggio =
        ruolo === 'admin'
          ? 'Nuovo amministratore registrato con successo'
          : 'Nuovo dipendente registrato con successo';

      this.formRegistrazione.reset({
        nome: '',
        email: '',
        password: '',
        ruolo: 'dipendente',
      });

      alert('Inserito con successo');
    } catch (errore: any) {
      console.error('Errore registrazione utente', errore);

      if (errore?.code === 'auth/email-already-in-use') {
        this.errore = 'Questa email è già in uso';
      } else if (errore?.code === 'auth/invalid-email') {
        this.errore = 'Formato email non valido';
      } else if (errore?.code === 'auth/weak-password') {
        this.errore = 'La password deve contenere almeno 6 caratteri';
      } else {
        this.errore = 'Errore durante la registrazione';
      }
    } finally {
      this.isLoading = false;
    }
  }
}
