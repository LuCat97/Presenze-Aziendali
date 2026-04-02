import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PresenzeService {
  private firestore = getFirestore();

  async aggiungiPresenza(presenza: any) {
    const idDocumento = `${presenza.uidDipendente}_${presenza.data}`;

    await setDoc(doc(this.firestore, 'presenze', idDocumento), presenza);
  }

  async presenzaEsiste(uidDipendente: string, data: string) {
    const idDocumento = `${uidDipendente}_${data}`;
    const docRef = doc(this.firestore, 'presenze', idDocumento);
    const snapshot = await getDoc(docRef);

    return snapshot.exists();
  }

  async getPresenzePerData(data: string) {
    const presenzeRef = collection(this.firestore, 'presenze');
    const q = query(presenzeRef, where('data', '==', data));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getStoricoPresenze() {
    const presenzeRef = collection(this.firestore, 'presenze');
    const q = query(presenzeRef, orderBy('data', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
