import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage"
import "firebase/storage"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  // apiKey: "AIzaSyBtZ-EAOMld_GYFTBrFXaECuRl__Mgwojg",
  // authDomain: "nextjs-todo-cf9c0.firebaseapp.com",
  // projectId: "nextjs-todo-cf9c0",
  // storageBucket: "nextjs-todo-cf9c0.appspot.com",
  // messagingSenderId: "127905446598",
  // appId: "1:127905446598:web:8a2c5d2c209a9e6b1eb5c7"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)