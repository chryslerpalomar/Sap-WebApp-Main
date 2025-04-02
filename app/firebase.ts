import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getMessaging, isSupported } from "firebase/messaging"
import { getStorage } from "firebase/storage"

/*
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
*/

const firebaseConfig = {
  apiKey: "AIzaSyBKP4vii7YwTfq0_n4QsZJTvMcq2pLaAHg",
  authDomain: "palmsapfermentation.firebaseapp.com",
  projectId: "palmsapfermentation",
  storageBucket: "palmsapfermentation.firebasestorage.app",
  messagingSenderId: "316943151129",
  appId: "1:316943151129:web:41f498425f9f21c82a3a88",
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return getMessaging(app)
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})()
