import { collection, where, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept, user) => {
    const [{cols, count, today}, dispatch] = useAuthState()

    const [triggerCount, setTriggerCount] = useState([]);

    const day = (24*60*60*1000)

    // useEffect(() => {
    //     setTriggerCount([])
    // }, [today, dept]);

    // useEffect(() => {
    //     if (count % 2 !== 0) {
    //         setTriggerCount(prev => ([...prev,count]))
    //     }
    // }, [count]);

    useEffect(() => {
    const start = new Date(cols[0].label).getTime()
    const end = new Date(cols[6].label).getTime()
    const q = query(collection(db, dept), where("date", ">=", start), where("date", "<=", end), orderBy("date"))

    let obj = {}

    const listen = onSnapshot(q, (qSnap) => {
        console.log("Post Listener: RUNNING")
        qSnap.forEach(post => {
            // const source = post.metadata.hasPendingWrites
            // if (!source) {
                // console.log(source, post.data().id)
                obj[post.data().id] = post.data()
            // }
        })
        console.log(Object.keys(obj).length)
        dispatch({
            type: "SET-OBJ",
            name: "posts",
            load: obj
        })
        // console.log("Post Listener: COMPLETE")
    })

    window.addEventListener("subscribe", listen)

        return () => {
            window.removeEventListener("subscribe", listen)
        }
    }, [dept])
}

export default usePostsListener