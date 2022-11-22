import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4jz-7uSJJ1rXS0Qr4oanAjC9J3hDt0-s",
  authDomain: "dundermifflin-338e3.firebaseapp.com",
  projectId: "dundermifflin-338e3",
  storageBucket: "dundermifflin-338e3.appspot.com",
  messagingSenderId: "238446615384",
  appId: "1:238446615384:web:e7becc3752168f294c232d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
