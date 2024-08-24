import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB56Vmlz9r8RAtcJqKEIBQVzXv7LBpNygI",
  authDomain: "auth-test-1e3fc.firebaseapp.com",
  projectId: "auth-test-1e3fc",
  storageBucket: "auth-test-1e3fc.appspot.com",
  messagingSenderId: "335692353598",
  appId: "1:335692353598:web:9040c76db36d3b077fc16f",
  measurementId: "G-40KX03X61L",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth: Auth = getAuth(app);

export { app, auth };