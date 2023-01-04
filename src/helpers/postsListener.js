import { collection, where, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept, user) => {
    const [{cols}, dispatch] = useAuthState()

    useEffect(() => {
        const day = (24*60*60*1000)
        const mon = new Date(cols[0].label - (day * 7))
        const q = query(collection(db, dept), where("date", ">=", mon.getTime()), orderBy("date"))
        let obj = {}
        console.log("Post Listener: RUNNING")
        const listen = onSnapshot(q, (qSnap) => {
            qSnap.forEach(post => {
                // console.log(post.data())
                obj[post.data().id] = post.data()
            })
            // console.log(obj)
            dispatch({
                type: "SET-OBJ",
                name: "posts",
                load: obj
            })
            console.log("Post Listener: COMPLETE")
        })
        return listen
    }, [dept])
}

export default usePostsListener