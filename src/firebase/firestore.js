import {getFirestore, collection, getDocs, setDoc, doc, DocumentSnapshot} from 'firebase/firestore'
import {app} from './firebaseApp'

const db = getFirestore(app)

export const createEE = () => {
    
}


export const createPos = () => {

}



export const writeData = async (col, load) => {
    await setDoc(doc(db, col, load.id), load).then(() => {
        console.log("Doc Written")
    })
   
}

export const getData = async (col) => {
    await getDoc(col)
    if(docSnap.exists()) {
        console.log(docSnap.data())
    } else {
        console.log("No Docs Retrieved")
    }
}