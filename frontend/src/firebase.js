import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA6xK6TYlHLy5GPrir_xoMUq_MYoxK0aQg",
  authDomain: "orderprint-web.firebaseapp.com",
  projectId: "orderprint-web",
  storageBucket: "orderprint-web.firebasestorage.app",
  messagingSenderId: "321778002458",
  appId: "1:321778002458:web:4a2764bbc04fd733763fa3",
  measurementId: "G-PCC28PG6ZR"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)