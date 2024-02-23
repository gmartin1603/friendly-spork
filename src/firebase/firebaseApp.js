import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseConfig2 } from "../private/firestore";

export const app = initializeApp(firebaseConfig); // overtime-management-83008 (production)
// export const app = initializeApp(firebaseConfig2); // otm-staging-725a6 (staging)
