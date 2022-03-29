import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut  } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD62dSEvYTuyAJPdHvRiTwvWyxjqDyQ8iU",
  authDomain: "linkedin-clone-yeasin.firebaseapp.com",
  projectId: "linkedin-clone-yeasin",
  storageBucket: "linkedin-clone-yeasin.appspot.com",
  messagingSenderId: "575724311254",
  appId: "1:575724311254:web:d15079089ae267b8582f77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);


export {
  auth,
  provider,
  storage,
  signInWithPopup,
  signOut,
  collection,
  getDocs,
  addDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
};
export default db;
