import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsQaGZtFFafdIfTUqz-nL1c4HVqFnZZRE",
  authDomain: "countdown-boardapp.firebaseapp.com",
  projectId: "countdown-boardapp",
  storageBucket: "countdown-boardapp.appspot.com",
  messagingSenderId: "108711820788",
  appId: "1:108711820788:web:b23237bc7de3d5a66f8da1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
