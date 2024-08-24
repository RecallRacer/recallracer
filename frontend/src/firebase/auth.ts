import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  updateProfile,  // Import updateProfile
} from "firebase/auth";

// Function to create a new user with email, password, and displayName
export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string  // Accept displayName as a parameter
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (user) {
    // Update the user's profile with the displayName
    await updateProfile(user, {
      displayName: displayName,
    });
  }

  return userCredential;
};

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to sign in with Google
export const doSignInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

// Function to sign out the current user
export const doSignOut = (): Promise<void> => {
  return auth.signOut();
};

// Function to send a password reset email
export const doPasswordReset = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Function to change the password for the current user
export const doPasswordChange = (password: string): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return Promise.reject(new Error("No authenticated user found."));
  }
  return updatePassword(currentUser, password);
};

// Function to send an email verification to the current user
export const doSendEmailVerification = (): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return Promise.reject(new Error("No authenticated user found."));
  }
  return sendEmailVerification(currentUser, {
    url: `${window.location.origin}/home`,
  });
};
