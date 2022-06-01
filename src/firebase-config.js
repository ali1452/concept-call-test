import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { signOut } from "firebase/auth";
import { keys } from "./.env";


const firebaseConfig = {
    apiKey: "AIzaSyC9sFCgPdOQ839FsNHFeyg07gSahy1daPI",
    authDomain: "myreactdata.firebaseapp.com",
    databaseURL: "https://myreactdata-default-rtdb.firebaseio.com",
    projectId: "myreactdata",
    storageBucket: "myreactdata.appspot.com",
    messagingSenderId: "228646686265",
    appId: "1:228646686265:web:4f657c71ecc40f0ed287e8"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const SignOut = signOut(auth).then(()=>{
  localStorage.clear()
});