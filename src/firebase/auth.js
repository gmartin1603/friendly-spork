import {auth} from './firebaseApp'

export const signin = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
    .then(user => console.log(user))
}