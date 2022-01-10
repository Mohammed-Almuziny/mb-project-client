// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAtkJWI7PpayHgrn20vMC1YfB9mI8-rxI",
  authDomain: "mb-project-mohammed-almuziny.firebaseapp.com",
  projectId: "mb-project-mohammed-almuziny",
  storageBucket: "mb-project-mohammed-almuziny.appspot.com",
  messagingSenderId: "148137353393",
  appId: "1:148137353393:web:8ac59e9be69e51a1c7c290",
  measurementId: "G-Q3729TXT5H",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };