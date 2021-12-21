// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCDA5tk1sqUm8atU8DxHwZ0ZtYqVY5s8M",
  authDomain: "opendata-explorer.firebaseapp.com",
  projectId: "opendata-explorer",
  storageBucket: "opendata-explorer.appspot.com",
  messagingSenderId: "930569582749",
  appId: "1:930569582749:web:665804d7dae6faff83fc74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app