import {db} from './firebaseApp'

export const writeData = (load) => {
    db.collection(load.col).doc(load.email).set(
        load
    ).then(
        console.log("EE Created")
    ).catch(
        (err) => console.log("Error: ", err)
    )
}