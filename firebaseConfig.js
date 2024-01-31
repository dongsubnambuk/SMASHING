
import 'firebase/compat/firestore';
import firebase, { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBYdh8HhKGE8K2_Z-iPfSED2Jf8GbcbS0Q",
  authDomain: "prote-7c8cd.firebaseapp.com",
  projectId: "prote-7c8cd",
  storageBucket: "prote-7c8cd.appspot.com",
  messagingSenderId: "23313563315",
  appId: "1:23313563315:web:db7dd70efa4c856afa3ac6",
  measurementId: "G-JHQK574W8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, firebaseConfig };