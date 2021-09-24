import {db} from './firebaseApp'

export const writeData = (load) => {
    console.log(load)
    db.collection(load.col).doc(load.email? load.email : `${load.job} ${load.start} - ${load.end}`).set(
    // db.collection(load.col).doc(load.email || load.job).set(
        load
    ).then(
        console.log("Document Written")
    ).catch(
        (err) => console.log("Error: ", err)
    )
}

export const getData = (col) => {
    db.collection(col).doc("Extrusion Op 7 - 3").get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}