import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const useCollListener = (dept, user) => {
    const [{}, dispatch] = useAuthState()
    
    useEffect(() => {
        if (dept) {
            console.log("Collection Listener: RUNNING")
            const q = query(collection(db, dept), orderBy("order"))
            
            const unsubscribe = onSnapshot(q, (qSnap) => {
                let obj = {}
                qSnap.forEach(doc => {
                    // console.log(doc.data())
                    obj[doc.data().id] = doc.data()
                })
                // dispatch({
                //     type: "UPDATE-COLLS",
                //     name: "colls",
                //     load: obj
                // })
                console.log("Collection Listener: COMPLETE")
            })
                return unsubscribe
        }
    }, [dept])
}

export default useCollListener