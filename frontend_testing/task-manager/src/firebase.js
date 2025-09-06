// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGOTXnQoftlDT5NcfLtpkwPKgG-2BleEA",
  authDomain: "taskmanager-6ba18.firebaseapp.com",
  databaseURL: "https://taskmanager-6ba18-default-rtdb.firebaseio.com",
  projectId: "taskmanager-6ba18",
  storageBucket: "taskmanager-6ba18.firebasestorage.app",
  messagingSenderId: "294152275234",
  appId: "1:294152275234:web:19fd029331b178b7ef917b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);