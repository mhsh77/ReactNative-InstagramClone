// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Firestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw32uHr8MTlMPRcYvJ5gfIdfFxcBNlHcg",
  authDomain: "instagram-clone-react-na-bd597.firebaseapp.com",
  projectId: "instagram-clone-react-na-bd597",
  storageBucket: "instagram-clone-react-na-bd597.appspot.com",
  messagingSenderId: "176424187066",
  appId: "1:176424187066:web:4e4f3023b43301340dfe83"
};


let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();
export  { db, auth,firebase };