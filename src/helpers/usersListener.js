import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";

const useUserListener = (dept) => {
    const [{}, dispatch] = useAuthState()
    
    useEffect(() => {
            // console.log("User Listener: RUNNING")
            const q = query(collection(db, "users"), orderBy("startDate"))
            
            const unsubscribe = onSnapshot(q, (qSnap) => {
                let arr = []
                qSnap.forEach(doc => {
                    
                    arr.push(doc.data()) 
                })
                dispatch({
                    type: "UPDATE-USERS",
                    dept: dept,
                    load: arr
                })
                // console.log("User Listener: COMPLETE")
            })
                return unsubscribe
        
    }, [dept])
}

export default useUserListener