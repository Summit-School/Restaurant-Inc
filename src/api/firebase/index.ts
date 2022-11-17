// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA_EkE_T0tgVLiZj3W8-lsoV-HVeNct9XU",
    authDomain: "restau-1234.firebaseapp.com",
    databaseURL: "https://restau-1234-default-rtdb.firebaseio.com",
    projectId: "restau-1234",
    storageBucket: "restau-1234.appspot.com",
    messagingSenderId: "761394795854",
    appId: "1:761394795854:web:903ba032a01442018efa1f",
    measurementId: "G-SM158S9ED0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);


export {
    app,
    analytics,
    db,
    auth
};
