import { initializeApp } from "firebase/app";
import { prodConfig, stageConfig } from "../private/firestore";

const target = process.env.REACT_APP_FIREBASE_TARGET; // production or staging
const firebaseConfig = target === "production" ? prodConfig : stageConfig;

export const app = initializeApp(firebaseConfig);

export default app;
