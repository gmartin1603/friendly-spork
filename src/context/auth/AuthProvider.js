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
    const [rows, setRows] = useState([])

    const [width, height] = useWindowSize();

    useEffect(() => {
      // profile?.dept && 
      // profile.dept === 'admin' ?
      //     getData('casc').then(arr => {
      //       setRows(arr)
      //     }) 
      //     &&
      //     getData('csst').then(arr => {
      //       arr.forEach(obj => {
      //         setRows(
      //           [
      //             ...rows,
      //             obj
      //           ]
      //         )
      //       })
      //     })
      // :
      profile?.dept &&
      getData(profile.dept).then(obj => {
        setRows(obj.arr)
        // setRota(obj.rota)
      })
    },[profile])

    const users = [
        {
          id: 'VnRpdZX8uNSkJqY2EXdtKoasTnA2',
          role: 'ee',
          name: {first: 'George', last: 'Martin'},
          dName: 'G. Martin',
          dept: 'csst',
          quals: ['pack'],
          startDate: new Date('March 27, 2017'),
        },{
          id: 'VnRpdZX8uNSkJqY2EXdtKoas',
          role: 'op',
          name: {first: 'Extrusion', last: 'Operator'},
          dName: 'ETR Op',
          dept: 'csst',
        },{
          id: 'bsBHT1Hkn3T65E84J6mdGUMPcRV2',
          role: 'admin',
          name: {first: 'Stacie', last: 'Harwood'},
          dName: 'S. Harwood',
          dept: 'office',
          quals: ['office'],
          startDate: new Date('March 27, 2015'),
        },{
          id: 'VRpdZX8uNSkJqY2EXdtKoasTnA2',
          role: 'sup',
          name: {first: 'Ben', last: 'Smart'},
          dName: 'B. Smart',
          dept: 'office',
          quals: ['office'],
          startDate: new Date('March 27, 2019'),
    
        }
      ]

    // useEffect(() => {
    //     logOff()
    //   },[])

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

    return (
    <AuthContext.Provider value={{width, height, rows, user, signin, logOff, profile}}>
        {children}
    </AuthContext.Provider>
)}

export const useAuthState = () => useContext(AuthContext)