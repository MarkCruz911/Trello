import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDE6IX21DqpdY70cWRP1gxNPeg-E7IQF0g",
    authDomain: "board-888dc.firebaseapp.com",
    projectId: "board-888dc",
    storageBucket: "board-888dc.appspot.com",
    messagingSenderId: "1072906349267",
    appId: "1:1072906349267:web:2e47467b611517325a0226",
    measurementId: "G-L8M229PQ46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const db = getFirestore(app);