import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import React, {createContext, useContext, useEffect, useLayoutEffect, useState} from 'react'
import { auth } from '../../firebase/auth';
import { getData, getUser, writeData } from '../../firebase/firestore';

export const AuthContext = createContext();

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState('')
    const [profile, setProfile] = useState({})
    const [show, setShow] = useState(false)
    const [formObj, setFormObj] = useState()
    const [rows, setRows] = useState([])
    const [width, height] = useWindowSize();


    useEffect(() => {
      profile.dept && 
      profile.dept.map(col => {
        getData(col).then((obj) => {
          setRows(rows => ([...rows, obj.arr]))
        })
      })
    },[profile])

    useEffect(() => {
        user &&
        getUser(user).then((userDoc) => {
            setProfile(userDoc)
        })
    },[user])

    

    onAuthStateChanged(auth, (userObj) => {
        if (userObj) {
            setUser(userObj.uid)
        }
    })

    
    
    
    const signin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }

    const logOff = () => {
        signOut(auth).then(() => {
            setUser('')
            setProfile({})
        })
    }

    const toggleForm = (obj) => {
      console.log(obj)
      if(obj){
        setShow(true)
        setFormObj(obj)
      } else {
        setShow(false)
        setFormObj()
      }
    }

    return (
    <AuthContext.Provider value={{show, width, height, rows, user, signin, logOff, profile, toggleForm, formObj}}>
        {children}
    </AuthContext.Provider>
)}

export const useAuthState = () => useContext(AuthContext)