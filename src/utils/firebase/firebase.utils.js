import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPXXOPJRKavb1P1r0wF51vg0Gbz0XvW4g",
  authDomain: "new-steps-40893.firebaseapp.com",
  projectId: "new-steps-40893",
  storageBucket: "new-steps-40893.appspot.com",
  messagingSenderId: "880082118949",
  appId: "1:880082118949:web:d2ae6cff22fff5ce8a92cc",
};

const firebaseApp = initializeApp(firebaseConfig);

// set up sign in with google : service provider + auth service reference for our app
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
