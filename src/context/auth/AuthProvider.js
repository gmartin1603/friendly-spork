import { onAuthStateChanged, signOut, signInWithEmailAndPassword, getAuth, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import React, {createContext, useContext, useEffect, useReducer, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/auth';
import { getData, getUser, getUsers, writeData } from '../../firebase/firestore';
import useAuthChange from '../../helpers/authStateChange';

export const AuthContext = createContext();



export const AuthProvider = ({ children, reducer, initialState, dispatch }) => {
    
    const user = useAuthChange('')
    const [profile, setProfile] = useState({})
    const [show, setShow] = useState(false)
    const [showWeek, setShowWeek] = useState(false)
    const [formObj, setFormObj] = useState()
    const [colls, setColls] = useState([])
    const [view, setView] = useState([])
    const [users, setUsers] = useState([])

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState()

    // const toggleView = async (obj) => {
    //   setView(obj)
    //   if (obj[0].dept) {
    //     await getUsers("users",obj[0].dept)
    //     .then((arr) => {
    //         console.log(arr)
    //         setUsers(arr)
    //     })
    //   }
    // }

    // // useEffect(() => {
    // //   view &&
    // //   console.log(view[0].dept)
    // //   const fun = async () => {
    // //       if (view[0].dept) {
    // //           await getUsers("users",view[0].dept)
    // //           .then((arr) => {
    // //               console.log(arr)
    // //               setUsers(arr.arr)
    // //           })
    // //       }
    // //   }

    // //   fun()

    // // },[view])

    // useEffect(() => {
    //   const call = async () => {
        
    //     await profile.dept.map(col => {
    //       getData(col)
    //       .then((obj) => {
    //         setColls(colls => ([...colls, obj.arr]))
    //       })
    //       .catch((err) => {
    //         console.log(err.message)
    //       })
    //     })
    //   }
    //   profile?.dept &&
    //   call() 
    // },[profile])

    // useEffect(() => {
        
    //     const call = async () => {

    //       await getUser(user)
    //       .then((userDoc) => {
    //           setProfile(userDoc)
    //       })
    //       .catch((err) => {
    //         console.log(err.message)
    //       })
    //     }
    //     user?
    //     call()
    //     :
    //     setProfile({})
        
    // },[user])

    // useEffect(() => {
    //   setView(colls[0])
      
    // },[colls])

    // useEffect(() => {
    //   const fun = async () => {
    //     if (view[0].dept) {
    //         await getUsers("users",view[0].dept)
    //         .then((arr) => {
    //             console.log(arr)
    //             setUsers(arr)
    //         })
    //     }
    // }

    // // fun()
    // },[view])
    
    
    const signin = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        let user = userCred.user
        setErrors()
        console.log(userCred.user)
      })
      .catch((error) => {
        if (error.message)
          setErrors(error.code)
      })
  }

    const logOff = () => {
        signOut(auth)
        .then(() => {
            setProfile({})
            setColls([])
            useNavigate('/')
        })
        .catch((error) => {
          if (error) {
            setErrors(error.code)
            console.log(error.message)
          }
        })
    }

    const passReset = async (email) => {

      await sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Link sent to " + email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        setErrors(error.code)
      });

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
    <AuthContext.Provider value={useReducer(reducer, initialState, dispatch)}>
        {children}
    </AuthContext.Provider>
)}

export const useAuthState = () => useContext(AuthContext)