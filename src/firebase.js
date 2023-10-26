// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv6JsvTGPv4AHhd_anFdQ2x0eZyg3ojgw",
  authDomain: "simsim-poject.firebaseapp.com",
  projectId: "simsim-poject",
  storageBucket: "simsim-poject.appspot.com",
  messagingSenderId: "446437051677",
  appId: "1:446437051677:web:3dd2ca0a99699801dae5f4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);