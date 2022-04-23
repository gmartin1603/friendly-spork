import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { app } from './firebaseApp'

export const auth = getAuth(app)

// onAuthStateChanged(auth, (user) => {
//     console.log(user)
// })

export const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(user => console.log(user))
}

export const createUser = (load) => {
    createUserWithEmailAndPassword(auth, load.email, load.password)
    .then((user) => console.log(user))
}

