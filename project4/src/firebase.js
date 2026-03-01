import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD32lksWX0kWU4uOvluth3k6SYGqHDCzE",
  authDomain: "react-auth-e5777.firebaseapp.com",
  projectId: "react-auth-e5777",
  storageBucket: "react-auth-e5777.firebasestorage.app",
  messagingSenderId: "730213955791",
  appId: "1:730213955791:web:a1bd688430c74bb475dfba",
  measurementId: "G-QJGBNJYWRX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);