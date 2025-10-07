
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGj6JB3hGLVNDnZ90fsBY7VOr9mtgRGXA",
  authDomain: "veggiemart-d477b.firebaseapp.com",
  projectId: "veggiemart-d477b",
  storageBucket: "veggiemart-d477b.firebasestorage.app",
  messagingSenderId: "367291587551",
  appId: "1:367291587551:web:60d345ce50042011e5026a",
  measurementId: "G-4NBNCF1EDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);