import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3a8sUD3iT4NOjecfz6XqCloUzY6tDqa0",
  authDomain: "task-management-ea612.firebaseapp.com",
  projectId: "task-management-ea612",
  storageBucket: "task-management-ea612.appspot.com",
  messagingSenderId: "244818410807",
  appId: "1:244818410807:web:72aea93688782f0b936eb2",
  measurementId: "G-8K8ECHPGT3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
