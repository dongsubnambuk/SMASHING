// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);