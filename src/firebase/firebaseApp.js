import firebase from "firebase"

// Replace with own credentials & uncomment
const firebaseConfig = {
    // apiKey: ,
    // authDomain: ,
    // projectId: ,
    // storageBucket: ,
    // messagingSenderId: ,
    // appId: ,
    // measurementId: 
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();