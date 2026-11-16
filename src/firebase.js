// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-y-xhkuhoGz-Btf4lavk6v9XJwyGAuQg",
  authDomain: "cenore-doces.firebaseapp.com",
  projectId: "cenore-doces",
  storageBucket: "cenore-doces.firebasestorage.app",
  messagingSenderId: "206655994638",
  appId: "1:206655994638:web:65b10f2991c713f86fb55f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORTAÇÃO NOMEADA OBRIGATÓRIA ('auth')
export const auth = getAuth(app);