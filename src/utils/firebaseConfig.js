// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZDUPQRiPHP9xWsEjHokN5Of25qeVvJ2E",
  authDomain: "mb-project-d9dc3.firebaseapp.com",
  projectId: "mb-project-d9dc3",
  storageBucket: "mb-project-d9dc3.appspot.com",
  messagingSenderId: "866211132885",
  appId: "1:866211132885:web:9d7cc2b81bc37f0223395c",
  measurementId: "G-G84MWBE0DY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
