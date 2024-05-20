import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD84SoyFYs4IH89CTJePXgyRYIfVnZ-70M",
  authDomain: "facebook-clone-7ff4a.firebaseapp.com",
  projectId: "facebook-clone-7ff4a",
  storageBucket: "facebook-clone-7ff4a.appspot.com",
  messagingSenderId: "539624084118",
  appId: "1:539624084118:web:a9ba55e34a7427f56b28b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const storage = getStorage();
