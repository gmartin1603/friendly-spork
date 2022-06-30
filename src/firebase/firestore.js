import {getFirestore, collection, getDocs, setDoc, doc, getDoc, orderBy, query, where} from 'firebase/firestore'
import {app} from './firebaseApp'

export const db = getFirestore(app)

export const createEE = () => {
    
}

export const getUsers = async (col,dept) => {
    
    const q = query(collection(db,col), where("dept", "==", dept))
    let arr = []

    await getDocs(q)
    .then(snapShot => {

        snapShot.forEach((user) => {
            arr.push(user.data())
        })
    })
    return arr
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

export const createPost = async (load) => {
    console.log(load.pos)
    await setDoc(doc(db, load.coll, load.doc, load.subColl,load.post), load.data, {merge: true}).then(() => {
        console.log('Post Created')
    })
}

export const writeData = async (load) => {
    console.log(load)
    const docRef = doc(db, load.coll, load.doc)
    await setDoc(docRef, load.data, {merge:true}).then(() => {
        console.log("Doc Written")
    })
   
}

// export const getRota = async (col) => {
//     let q = query(collection(db, col), where('id' === rota))
// }

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