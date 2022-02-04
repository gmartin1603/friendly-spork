import {getFirestore, collection, getDocs} from 'firebase/firestore'
import {app} from './firebaseApp'

const db = getFirestore(app)

export const createEE = () => {
    
}


export const createPos = () => {

}



// export const writeData = (load) => {
//     console.log(load)
//     collection(load.col).doc(load.email? load.email : load.job).set(
//     // db.collection(load.col).doc(load.email || load.job).set(
//         load
//     ).then(
//         console.log("Document Written")
//     ).catch(
//         (err) => console.log("Error: ", err)
//     )
// }

// export const getData = async (col, func) => {
//     let load = []
//     let data = ''

//     await collection(col).get().then((querySnapshot) => {

//         querySnapshot.forEach((doc) => {
//             // console.log(doc.id, " => ", doc.data());
//             data = doc.data()
//             load.push(
//                 data
//             )
//             // console.log(load)
//         })
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     })
//     return load
// }