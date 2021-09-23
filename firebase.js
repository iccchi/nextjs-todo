import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage"
import { getFirestore } from "@firebase/firestore";
import "firebase/storage"
import "firebase/firestore"

export const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)