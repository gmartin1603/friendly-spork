import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";

const useUserListener = () => {
    const [{ }, dispatch] = useAuthState()

    useEffect(() => {
        console.log("User Listener: RUNNING")
        const q = query(collection(db, "users"), orderBy("startDate"))

        const unsubscribe = onSnapshot(q, (qSnap) => {
            let arr = []
            qSnap.forEach(doc => {

                arr.push(doc.data())
            })
            dispatch({
                type: "SET-VALUE",
                name: "users",
                load: arr
            })
            console.log("User Listener: COMPLETE")
        })
        return unsubscribe

    }, [])
}

export default useUserListener