// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrFXEuxiN-bq3x9gLIbqVrregAe8DAtiI",
  authDomain: "hypertension-app.firebaseapp.com",
  projectId: "hypertension-app",
  storageBucket: "hypertension-app.appspot.com",
  messagingSenderId: "119015407728",
  appId: "1:119015407728:android:6fc73e8898cb62143174b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };