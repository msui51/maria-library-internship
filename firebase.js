// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhM84Ezx9Rg4-lilTNLwkIVs3qY4-HABo",
  authDomain: "library-internship.firebaseapp.com",
  projectId: "library-internship",
  storageBucket: "library-internship.firebasestorage.app",
  messagingSenderId: "1057487803638",
  appId: "1:1057487803638:web:fa77265094b6dd9375c8d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);