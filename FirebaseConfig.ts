// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCKxEeg9SXCpTE6vQ_Bbdh9iU4mBYLSGU",
  authDomain: "fitkit-568d2.firebaseapp.com",
  projectId: "fitkit-568d2",
  storageBucket: "fitkit-568d2.firebasestorage.app",
  messagingSenderId: "256124944224",
  appId: "1:256124944224:web:addffba4455810d29c6805"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);