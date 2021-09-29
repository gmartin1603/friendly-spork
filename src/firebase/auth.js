import {auth} from './firebaseApp'

export const signin = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
    .then(user => console.log(user))
}

export const createUser = (load) => {
    auth.createUserWithEmailAndPassword(load.email, load.password)
    .then((user) => console.log(user))
}