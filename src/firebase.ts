import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlAykJhOFPjCI2DUs5Htn7TQBmGCx4tOE",
  authDomain: "consultant-app-a08eb.firebaseapp.com",
  databaseURL: "https://consultant-app-a08eb-default-rtdb.firebaseio.com",
  projectId: "consultant-app-a08eb",
  storageBucket: "consultant-app-a08eb.firebasestorage.app",
  messagingSenderId: "554365556413",
  appId: "1:554365556413:web:646ababbcc987bf27809d4"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);