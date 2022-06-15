import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept, user) => {
    const [{}, dispatch] = useAuthState()
    
    useEffect(() => {
        const q = query(collection(db, dept), orderBy("date"))

        const unsubscribe = onSnapshot(q, (qSnap) => {
            // console.log("Post Listener: RUNNING")
            let obj = {}
            qSnap.forEach(post => {
                // console.log(post.data())
                obj[post.data().id] = post.data()
            })
            // setPosts(obj)
            dispatch({
                type: "SET-OBJ",
                name: "posts",
                load: obj
            })
            // console.log("Post Listener: COMPLETE")
        })
        return unsubscribe
    }, [dept])
}

export default usePostsListener