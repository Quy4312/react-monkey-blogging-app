import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvyT34WgtsTUa-LkQvqbWXNl_-WTLvSO4",
  authDomain: "monkey-blogging-aa186.firebaseapp.com",
  projectId: "monkey-blogging-aa186",
  storageBucket: "monkey-blogging-aa186.appspot.com",
  messagingSenderId: "989440900842",
  appId: "1:989440900842:web:7191ed019fa4f9d967e193",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
