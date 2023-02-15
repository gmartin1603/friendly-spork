import { collection, where, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";

const usePostsListener = (dept) => {
    const [{cols, count, today}, dispatch] = useAuthState()

    const [triggerCount, setTriggerCount] = useState([]);

    const day = (24*60*60*1000)

    useEffect(() => {
        setTriggerCount([])
    }, [today, dept]);

    useEffect(() => {
        if (count % 2 !== 0) {
            setTriggerCount(prev => ([...prev,count]))
        }
    }, [count]);

    useEffect(() => {
    const start = new Date(cols[0].label).getTime() - (day * 14)
    const end = new Date(cols[6].label).getTime() + (day * 14)
    const q = query(collection(db, dept), where("date", ">=", start), where("date", "<=", end), orderBy("date"))


    const listen = onSnapshot(q, (qSnap) => {
        // console.log("Post Listener: RUNNING")
        let obj = {}
        qSnap.forEach(post => {
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

    window.removeEventListener("listen", listen)

        return () => {
            window.removeEventListener("listen", listen)
        }
    }, [triggerCount])
}

export default usePostsListener