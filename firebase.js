// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi5FgV5Q_brBszutM9fOwFgHCvy5tC7kM",
  authDomain: "inventory-management-ff538.firebaseapp.com",
  projectId: "inventory-management-ff538",
  storageBucket: "inventory-management-ff538.appspot.com",
  messagingSenderId: "61256870737",
  appId: "1:61256870737:web:cfa3d39b924370f8be4170",
  measurementId: "G-M4NPPGCXT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize FireStore
const firestore = getFirestore(app)

export {firestore}
