// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA78lvo7e6y8aQX4zfNEasI6s5lgpMp7hk",
  authDomain: "shafn-f2a6e.firebaseapp.com",
  projectId: "shafn-f2a6e",
  storageBucket: "shafn-f2a6e.firebasestorage.app",
  messagingSenderId: "986397285152",
  appId: "1:986397285152:web:0395e5ec40fcd0f58c1545",
  measurementId: "G-QJP4Q0P3SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
