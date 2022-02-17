import {getFirestore, collection, getDocs, setDoc, doc, getDoc, orderBy, query} from 'firebase/firestore'
import {app} from './firebaseApp'

const db = getFirestore(app)

export const createEE = () => {
    
}


export const getUser = async (uid) => {
    const docRef = doc(db, "users", uid)

    try {
        const userDoc = await getDoc(docRef)
        
        if (userDoc.exists()) {
            return userDoc.data()
        }
    } catch (err) {
        console.log(err)
    }
}



export const writeData = async (col, load) => {
    await setDoc(doc(db, col, load.id), load).then(() => {
        console.log("Doc Written")
    })
   
}

export const getRota = async (col) => {
    let q = query(collection(db, col), where('id' === rota))
}

export const getData = async (col) => {

    try {
       let load = await getDocs(query(collection(db, col), orderBy('order')))
       let arr = []
       let rota = {}
       load.forEach(d => {
               arr.push(d.data())
           
       })
        return {arr: arr}

    } catch(err) {
        console.log("Error: " + err)
    }
}