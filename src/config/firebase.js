import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO7fDAENkpgeCB_ACju8hbRgKLjs3lDuU",
  authDomain: "chat-room-5dea4.firebaseapp.com",
  projectId: "chat-room-5dea4",
  storageBucket: "chat-room-5dea4.appspot.com",
  messagingSenderId: "868852026927",
  appId: "1:868852026927:web:7e0e81c27c68de782cc0da",
  measurementId: "G-1BKMT9RENH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
