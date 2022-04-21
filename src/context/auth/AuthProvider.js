import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import React, {createContext, useContext, useEffect, useLayoutEffect, useState} from 'react'
import { auth } from '../../firebase/auth';
import { getData, getUser, writeData } from '../../firebase/firestore';
import useAuthChange from '../../helpers/authStateChange';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    
    const user = useAuthChange('')
    const [profile, setProfile] = useState({})
    const [show, setShow] = useState(false)
    const [showWeek, setShowWeek] = useState(false)
    const [formObj, setFormObj] = useState()
    const [colls, setColls] = useState([])
    const [view, setView] = useState([])

    const toggleView = (obj) => {
      setView(obj)
    }



    useEffect(() => {
      const call = async () => {
        
        await profile.dept.map(col => {
          getData(col)
          .then((obj) => {
            setColls(colls => ([...colls, obj.arr]))
          })
          .catch((err) => {
            console.log(err.message)
          })
        })
      }
      profile?.dept &&
      call() 
    },[profile])

    useEffect(() => {
        
        const call = async () => {

          await getUser(user)
          .then((userDoc) => {
              setProfile(userDoc)
          })
          .catch((err) => {
            console.log(err.message)
          })
        }
        user?
        call()
        :
        setProfile({})
        
    },[user])

    useEffect(() => {
      setView(colls[0])
    },[colls])
    
    
    const signin = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
          console.log(userCred.user.uid + " is signed in")
      })
      .catch((error) => {
          console.log(error.message)
      })
  }

    const logOff = () => {
        signOut(auth)
        .then(() => {
            setProfile({})
            setColls([])
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    const toggleForm = (obj) => {
      console.log(obj)
      if(obj){
        switch (obj.type) {
          case "single":
            setShow(true)
            setFormObj(obj)
            break
          case "week":
            setShowWeek(true)
            setFormObj(obj)
            break
          default:
            setShow(false)
            setShowWeek(false)
            setFormObj()
        }
      } else {
        setShow(false)
        setShowWeek(false)
        setFormObj()
      }
    }

    return (
    <AuthContext.Provider value={{toggleView, view, showWeek, show, colls, user, signin, logOff, profile, toggleForm, formObj}}>
        {children}
    </AuthContext.Provider>
)}

export const useAuthState = () => useContext(AuthContext)