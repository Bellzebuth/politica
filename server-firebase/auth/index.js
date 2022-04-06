// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA3GVSLCVUbVtl79x4ADEbIN-VxbwcZK0",
  authDomain: "politica-database.firebaseapp.com",
  projectId: "politica-database",
  storageBucket: "politica-database.appspot.com",
  messagingSenderId: "782661794511",
  appId: "1:782661794511:web:1a2450b1292a4552e795ba",
  measurementId: "G-5309HV59ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
