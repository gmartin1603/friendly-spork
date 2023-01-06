import { collection, where, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept, user) => {
    const [{cols, count, posts, today}, dispatch] = useAuthState()

    const [triggerCount, setTriggerCount] = useState([]);

    useEffect(() => {
        setTriggerCount([])
    }, [today, dept]);

    useEffect(() => {
        if (count % 2 === 0) {
            if (!triggerCount.includes(count)) {
                setTriggerCount(prev => ([...prev,count]))
            }
        }
    }, [count]);

    useEffect(() => {
        const day = (24*60*60*1000)
        const start = new Date(cols[0].label - (day * 7)).getTime()
        const end = new Date(cols[6].label + (day * 14)).getTime()
        const q = query(collection(db, dept), where("date", ">=", start), where("date", "<=", end), orderBy("date"))

        let obj = new Object(posts)

        const listen = onSnapshot(q, (qSnap) => {
            console.log("Post Listener: RUNNING")
            qSnap.forEach(post => {
                // console.log(post.data())
                obj[post.data().id] = post.data()
            })
            // console.log(Object.keys(obj).length)
            dispatch({
                type: "SET-OBJ",
                name: "posts",
                load: obj
            })
            // console.log("Post Listener: COMPLETE")
        })
        return listen
    }, [dept, triggerCount, today])
}

export default usePostsListener