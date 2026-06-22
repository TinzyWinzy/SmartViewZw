/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Fallback is the auto-provisioned studio Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCzptDFwJamgo19hfLiw0GDlWNovirPzZU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "studio-1786310527-e2fad.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "studio-1786310527-e2fad",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "studio-1786310527-e2fad.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "620586552327",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:620586552327:web:e0e71cbc3ca9d6d7f4eea2"
};

const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || "ai-studio-57f0376f-a03d-4250-93eb-10f2ac234159";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, databaseId);
