import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { auth } from "../firebase/auth";

const useAuthChange = () => {
    const [user, setUser] = useState('')

    const [{}, dispatch] = useAuthState()

    const updateAuth = () => {
        onAuthStateChanged(auth, (userObj) => {
            // console.log("AuthStateChanged Ran")
            if(userObj) {
                console.log(`${userObj.email} signed in`)
                // console.log(userObj)
                setUser(userObj.uid)        
                
            } else {
                setUser('')
                console.log(`No one is signed in`)
            }
        }) 
    }
    useEffect(() => {
        window.addEventListener("authState", updateAuth)
        updateAuth()
        return () => {window.removeEventListener("authState", updateAuth)}
    }, [])
    
    return user
}

export default useAuthChange