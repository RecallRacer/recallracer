import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0p2LWNfXfiMYrISoeG-GOIDdfgD8KZGg",
  authDomain: "syncs-hacks.firebaseapp.com",
  projectId: "syncs-hacks",
  storageBucket: "syncs-hacks.appspot.com",
  messagingSenderId: "532115676111",
  appId: "1:532115676111:web:d79ec049f867646a3290ba",
  measurementId: "G-RTELQMVDYP"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth: Auth = getAuth(app);

export { app, auth };