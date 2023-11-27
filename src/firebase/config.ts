// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaYhpdE7Ujdc8ez-9nusvcBhZH3JsXkxQ",
  authDomain: "eduplay-nexus.firebaseapp.com",
  projectId: "eduplay-nexus",
  storageBucket: "eduplay-nexus.appspot.com",
  messagingSenderId: "1040859955739",
  appId: "1:1040859955739:web:0dbaebbb250dc59b96aebe",
  measurementId: "G-HGP8GPEBSX",
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default firebase_app;
