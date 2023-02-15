import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";

const useCollListener = (dept) => {
    const [{}, dispatch] = useAuthState()

    useEffect(() => {
        const q = query(collection(db, dept), orderBy("order"))

        const listen = onSnapshot(q, (qSnap) => {
                // console.log("Collection Listener: RUNNING")
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
                // console.log("Collection Listener: COMPLETE")
            })
            window.addEventListener("listen", listen)

            return () => {
                window.removeEventListener("listen", listen)
            }

    }, [dept])
}

export default useCollListener