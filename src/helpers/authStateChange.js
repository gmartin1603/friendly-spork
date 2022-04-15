import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";

const useAuthChange = () => {
    const [user, setUser] = useState('')

    useEffect(() => {
        const updateAuth = () => {
            onAuthStateChanged(auth, (userObj) => {
                console.log("AuthStateChanged Ran")
                if(userObj) {
                    console.log(`${userObj.email} signed in`)
                    setUser(userObj.uid)        
                } else {
                    setUser('')
                    console.log(`No one is signed in`)
                }
            }) 
        }
        window.addEventListener("authState", updateAuth)
        updateAuth()
        return () => window.removeEventListener("authState", updateAuth)
    }, [])
    return user
}

export default useAuthChange