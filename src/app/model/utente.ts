export interface Utente {
  uid: string;
  nome: string;
  email: string;
  ruolo: 'admin' | 'dipendente';
}
