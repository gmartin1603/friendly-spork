import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { app } from './firebaseApp'

const auth = getAuth()


export const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(user => console.log(user))
}

export const createUser = (load) => {
    createUserWithEmailAndPassword(auth, load.email, load.password)
    .then((user) => console.log(user))
}