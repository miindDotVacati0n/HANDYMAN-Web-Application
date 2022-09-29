import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyB0Pao-W6I2kKi9TidRw5WMAdk-zcDV1Hc",
    authDomain: "handy-5f4ba.firebaseapp.com",
    projectId: "handy-5f4ba",
    storageBucket: "handy-5f4ba.appspot.com",
    messagingSenderId: "17567610683",
    appId: "1:17567610683:web:47accbd65905b37b9f691e"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)