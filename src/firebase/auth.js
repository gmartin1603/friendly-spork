import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator} from 'firebase/auth'
import { app } from './firebaseApp'

export const auth = getAuth(app)

// if (process.env.NODE_ENV === 'development') {
//     connectAuthEmulator(auth, "http://localhost:9099");
// }


export const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(user => console.log(user))
}

export const createUser = (load) => {
    createUserWithEmailAndPassword(auth, load.email, load.password)
    .then((user) => console.log(user))
}

