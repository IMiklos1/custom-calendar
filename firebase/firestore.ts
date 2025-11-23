import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBquV0-wIcBSCtnuLIQSQoLPitkBs8cDB8",
  authDomain: "custom-calendar-32d55.firebaseapp.com",
  projectId: "custom-calendar-32d55",
  storageBucket: "custom-calendar-32d55.firebasestorage.app",
  messagingSenderId: "296957075068",
  appId: "1:296957075068:web:788f0da8296bcd626733f9",
  measurementId: "G-P2SHF2YM0D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);