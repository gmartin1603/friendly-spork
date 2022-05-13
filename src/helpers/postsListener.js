import { doc, onSnapshot } from "firebase/firestore";
import { useLayoutEffect, useState } from "react";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept) => {
    const [posts, setPosts] = useState({})
    const user = useAuthChange()
    

    useLayoutEffect(() => {
        const snapshot = () => {
        
            //firestore listener on "rota" doc. Updates schedual when a new posting is added to rota
            onSnapshot(doc(db, dept, 'rota'), (doc) => {
            setPosts(doc.data().posts) 
            })
            
        }
        window.addEventListener("postsUpdate", snapshot)
        snapshot()
        return () => window.removeEventListener("postsUpdate", snapshot)
    }, [])
    return posts
}

export default usePostsListener