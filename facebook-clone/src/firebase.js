import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsf0C7c8u1WkrW5euWG9L0bkMcgz9jdlw",
  authDomain: "facebook-68002.firebaseapp.com",
  databaseURL: "https://facebook-68002-default-rtdb.firebaseio.com",
  projectId: "facebook-68002",
  storageBucket: "facebook-68002.appspot.com",
  messagingSenderId: "773582314334",
  appId: "1:773582314334:web:6d0e7fd2107e945cb24dcf",
  measurementId: "G-B49W1L8MVJ",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCRTan_zJC9UmGq4ulYLCJTDbDIVPrndrE",
// //   authDomain: "facebook-clone-7ff4a.firebaseapp.com",
//   databaseURL: "https://facebook-clone-7ff4a-default-rtdb.firebaseio.com",
//   projectId: "facebook-clone-7ff4a",
//   storageBucket: "facebook-clone-7ff4a.appspot.com",
//   messagingSenderId: "539624084118",
//   appId: "1:539624084118:web:7c016099f6898b086b28b7",
// };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();
