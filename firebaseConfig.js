
import 'firebase/compat/firestore';
import firebase, { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const chattingRoom = '1'; // 채팅방 ID
const userUID = 'IT0OPavkJshdCO6JNhUw'; // 사용자 UID
const userName = 'son'; // 사용자 이름

const firebaseConfig = {
  apiKey: "AIzaSyDBAwwjuO4Z3h7vwUGIz-LIPwbQAFQPjS8",
  authDomain: "final-smashing.firebaseapp.com",
  databaseURL: "https://final-smashing-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "final-smashing",
  storageBucket: "final-smashing.appspot.com",
  messagingSenderId: "527748083905",
  appId: "1:527748083905:web:e9a7206892bf4872b3e440",
  measurementId: "G-ZGZNXNYJLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, firebaseConfig, chattingRoom, userUID, userName };