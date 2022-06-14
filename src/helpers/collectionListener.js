import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";

const useCollListener = (dept, user) => {
    const [{}, dispatch] = useAuthState()
    
    useEffect(() => {
            console.log("Collection Listener: RUNNING")
            const q = query(collection(db, dept), orderBy("order"))
            
            const unsubscribe = onSnapshot(q, (qSnap) => {
                let arr = []
                qSnap.forEach(doc => {
                    // console.log(doc.data())
                    arr.push(doc.data()) 
                })
                dispatch({
                    type: "UPDATE-COLLS",
                    name: "colls",
                    load: arr
                })
                console.log("Collection Listener: COMPLETE")
            })
                return unsubscribe
        
    }, [dept])
}

export default useCollListener