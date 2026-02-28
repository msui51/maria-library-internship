// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration (prefer env vars in .env.local)
// make sure environment variables are set, otherwise Firebase will throw obscure errors later
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// debug output during development
if (process.env.NODE_ENV === 'development') {
  Object.entries(firebaseConfig).forEach(([key, value]) => {
    if (!value) {
      console.warn(`Firebase config missing ${key}`);
    }
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const initFirebase = () => app; // Export a function to initialize Firebase, if needed
export const auth = getAuth(app);
export const db = getFirestore(app);