// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBquV0-wIcBSCtnuLIQSQoLPitkBs8cDB8",
  authDomain: "custom-calendar-32d55.firebaseapp.com",
  projectId: "custom-calendar-32d55",
  storageBucket: "custom-calendar-32d55.firebasestorage.app",
  messagingSenderId: "296957075068",
  appId: "1:296957075068:web:788f0da8296bcd626733f9",
  measurementId: "G-P2SHF2YM0D"
};

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

import { getFirestore } from 'firebase/firestore';
// Initialize Firestore
// ... existing code ...

const db = getFirestore(app);

export { auth, db };
