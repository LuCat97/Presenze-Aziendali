import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../environments/firebase.config';

const appFirebase = initializeApp(firebaseConfig);

export const autenticazioneFirebase = getAuth(appFirebase);
export const databaseFirebase = getFirestore(appFirebase);
