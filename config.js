import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCJwmIbTzCYJG8A7DL2BBzCDKWu9ivbzSs",
    authDomain: "biblioteca-ab5b5.firebaseapp.com",
    projectId: "biblioteca-ab5b5",
    storageBucket: "biblioteca-ab5b5.appspot.com",
    messagingSenderId: "217933633276",
    appId: "1:217933633276:web:52d0d14092f5ab8593e979"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()