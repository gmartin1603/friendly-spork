import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept, user) => {
    const [posts, setPosts] = useState({})
    const [{}, dispatch] = useAuthState()
    
    useEffect(() => {

        const q = query(collection(db, dept), orderBy("date"))

        const unsubscribe = onSnapshot(q, (qSnap) => {
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
        })
        
            // console.log("RUNNING")
            // window.addEventListener("postsUpdate", unsubscribe)
            
        // return () => {window.removeEventListener("postsUpdate",unsubscribe)}
        return unsubscribe
        
    }, [dept])
    
    // return posts
}

export default usePostsListener