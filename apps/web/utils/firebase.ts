import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) =>
  console.error("Error setting persistence:", error)
);

// Google Sign-in
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    if (auth.currentUser) {
      await signOut(auth);
    }
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken(true);
    console.log("User signed in:", result.user);
    console.log("Access Token:", token);
    return token;
  } catch (error: any) {
    if (error.code === "auth/network-request-failed") {
      console.error(
        "Network request failed. Please check your internet connection."
      );
    } else {
      console.error("Error during Google sign-in:", error.message);
    }
    throw error;
  }
};

// Email Sign-up and Verification
export const signUpAndVerifyEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent to", email);
    return userCredential.user;
  } catch (error) {
    console.error(`signup error: ${error}`);
    throw error;
  }
};

export const getCurrentUserToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log("Current User Token:", token);
    return token;
  } else {
    console.log("No user signed in");
  }
};

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
    user.getIdToken(true).then((token) => {
      console.log("Updated Access Token:", token);
    });
  } else {
    console.log("No user signed in");
  }
});

//get profile image
export const getProfileImage = async () => {
  const user = auth.currentUser;
  if (user) {
    console.log(user)
    return user.photoURL;
  } else {
    console.log("No user signed in");
  }
};

// Sign-out
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error: any) {
    console.error("Error signing out:", error.message);
  }
};

export default app;

// app.user().
