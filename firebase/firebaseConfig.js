import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAnzebUYEW-PWjcUibnufp6aX8lnBP0RZQ",
    authDomain: "pergro-54a67.firebaseapp.com",
    projectId: "pergro-54a67",
    storageBucket: "pergro-54a67.firebasestorage.app",
    messagingSenderId: "126811061801",
    appId: "1:126811061801:web:3d15ceac00fab11aafa638",
    measurementId: "G-37455Q9NNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
