import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyjusbMTW2k707l12hDs_rItdN2eMpGGw",
  authDomain: "gdg-project-ba5c6.firebaseapp.com",
  projectId: "gdg-project-ba5c6",
  storageBucket: "gdg-project-ba5c6.firebasestorage.app",
  messagingSenderId: "49778487609",
  appId: "1:49778487609:web:f517ff2c7be48a8ac478e8",
  measurementId: "G-ZPSR3DWV7B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);