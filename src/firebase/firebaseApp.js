import {initializeApp} from "firebase/app"
import { firebaseConfig } from "../private/firestore";

export const app = initializeApp(firebaseConfig);

