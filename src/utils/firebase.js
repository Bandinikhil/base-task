// Import the functions you need from the SDKs you need

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth,GoogleAuthProvider} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-MwtaewFx3Ap584S8fMbx0QgaynyipPo",
  authDomain: "auth-d0720.firebaseapp.com",
  projectId: "auth-d0720",
  storageBucket: "auth-d0720.appspot.com",
  messagingSenderId: "351975658447",
  appId: "1:351975658447:web:6fcbb801dcbcedba1238ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



