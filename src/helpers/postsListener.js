import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { db } from "../firebase/firestore";
import useAuthChange from "./authStateChange";

const usePostsListener = (dept, user) => {
    const [posts, setPosts] = useState({})
    
    // useEffect(() => {
    //     console.log(posts)
    // },[posts])

    // const snapshot = () => {
    //     if (user) {
    //         //firestore listener on "rota" doc. Updates schedual when a new posting is added to rota
    //         onSnapshot(doc(db, dept, 'rota'), (doc) => {
    //         setPosts(doc.data().posts) 
    //         })
            
    //     }
        
    // }

    // useLayoutEffect(() => {
        
    //     if (user) {
    //         console.log("RUNNING")
    //         window.addEventListener("postsUpdate", snapshot())
    //         // snapshot()
    //         return () => {window.removeEventListener("postsUpdate",snapshot)}
    //     }
    // }, [])
    
    useEffect(() => {

        const q = query(collection(db, dept), orderBy("date"))

        const unsubscribe = onSnapshot(q, (qSnap) => {
            let obj = {}
            qSnap.forEach(post => {
                // console.log(post.data())
                obj[post.data().id] = post.data()
            })
            setPosts(obj)
        })
        
            // console.log("RUNNING")
            // window.addEventListener("postsUpdate", unsubscribe)
            
        // return () => {window.removeEventListener("postsUpdate",unsubscribe)}
        return unsubscribe
        
    }, [])
    
    return posts
}

export default usePostsListener