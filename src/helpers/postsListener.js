import { doc, onSnapshot } from "firebase/firestore";
import { useLayoutEffect, useState } from "react";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept, user) => {
    const [posts, setPosts] = useState({})
    
    const snapshot = () => {
        if (user) {
            //firestore listener on "rota" doc. Updates schedual when a new posting is added to rota
            onSnapshot(doc(db, dept, 'rota'), (doc) => {
            setPosts(doc.data().posts) 
            })
            
        }
        
    }

    useLayoutEffect(() => {
        
        if (user) {
            console.log("RUNNING")
            window.addEventListener("postsUpdate", snapshot())
            // snapshot()
            return () => {window.removeEventListener("postsUpdate",snapshot)}
        }
    }, [])
    
    return posts
}

export default usePostsListener