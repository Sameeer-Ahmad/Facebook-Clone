import { initializeApp } from "firebase/app";
import { getFirestore,  doc, setDoc } from "firebase/firestore";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRTan_zJC9UmGq4ulYLCJTDbDIVPrndrE",
  authDomain: "facebook-clone-7ff4a.firebaseapp.com",
  projectId: "facebook-clone-7ff4a",
  storageBucket: "facebook-clone-7ff4a.appspot.com",
  messagingSenderId: "539624084118",
  appId: "1:539624084118:web:7c016099f6898b086b28b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);