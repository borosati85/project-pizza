import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDa9Lt7zmUzD_FDoJUDhbkjrJIC_yBttFs",
  authDomain: "project-pizza-33554.firebaseapp.com",
  projectId: "project-pizza-33554",
  storageBucket: "project-pizza-33554.appspot.com",
  messagingSenderId: "109028364799",
  appId: "1:109028364799:web:fa6b0a42b58d8278e2d7ca",
  measurementId: "G-Q16K8PJ891"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

//getting the authentication object, so we can use it, or export it
const auth = getAuth();

const signInWithGoogle = ()=> 
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  //gettint the firestore, to store users in the database
  const firestore = getFirestore();

  //store user data in firebase
  const createUserProfileDocument = async (userAuth, additionalData)=> {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`)
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user ' + error);
      }
    }
    return userRef;
  }

export { signInWithGoogle, auth, createUserProfileDocument }; 