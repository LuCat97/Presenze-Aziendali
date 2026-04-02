import { Injectable } from '@angular/core';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UtentiService {
  private firestore = getFirestore();

  async salvaUtente(utente: any) {
    await setDoc(doc(this.firestore, 'utenti', utente.uid), utente);
  }

  async getUtenti() {
    const utentiRef = collection(this.firestore, 'utenti');
    const snapshot = await getDocs(utentiRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getUtenteByUid(uid: string) {
    const utentiRef = collection(this.firestore, 'utenti');
    const q = query(utentiRef, where('uid', '==', uid));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docTrovato = snapshot.docs[0];
      return {
        id: docTrovato.id,
        ...docTrovato.data(),
      };
    }

    return null;
  }
}
