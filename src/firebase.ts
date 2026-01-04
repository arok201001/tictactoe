import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCj4vNmQfednODlZ8KmB8hitaKacLsadmw",
  authDomain: "tictactoe-16219.firebaseapp.com",
  databaseURL: "https://tictactoe-16219-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tictactoe-16219",
  storageBucket: "tictactoe-16219.firebasestorage.app",
  messagingSenderId: "21488013840",
  appId: "1:21488013840:web:4eb62a7edd8a0542e0b095",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);