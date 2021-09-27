import {db} from './firebaseApp'
import React from 'react'

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

export const getData = (col, func) => {
    let load = []
    let data = ''

    db.collection(col).get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            data = doc.data()
            load.push(
                data
            )
            // console.log(load)
        })
    }).then(() => {
        func(load)
    })
    
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
    
}