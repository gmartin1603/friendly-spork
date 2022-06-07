import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import LogIn from './components/LogIn';
import { useAuthState } from './context/auth/AuthProvider';
import { getData, getUser, getUsers } from './firebase/firestore';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthChange from './helpers/authStateChange';
import PopUpForm from './components/PopUpForm';
import MiscForm from './components/MiscForm';
import Loading from './components/Loading';
import BidForm from './components/forms/BidForm';

import { getMessaging, getToken } from "firebase/messaging";
import { background } from './firebase/cloudmessaging';


function App() {

  const [{
    formObj, 
    tabs, 
    view, 
    show, 
    showWeek, 
    showBid, 
    profile
  }, dispatch] = useAuthState()
  const user = useAuthChange()
  // background()
  // useEffect(() => {
  //   // Get registration token. Initially this makes a network call, once retrieved
  //   // subsequent calls to getToken will return from cache.
  //   const messaging = getMessaging();
  //   getToken(messaging, { vapidKey: 'BLEVPsC3ksrXvqeaSAJiEOi26IY7uxqgTW3826nUuGNe7OW9LEjovnKqINf0hl25l2nNrrauPGHf5nekLNvGkeA' }).then((currentToken) => {
  //     if (currentToken) {
  //       // Send the token to your server and update the UI if necessary
  //       console.log(currentToken)
  //     } else {
  //       // Show permission request UI
  //       console.log('No registration token available. Request permission to generate one.');
  //       // ...
  //     }
  //   }).catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);
  //     // ...
  //   });
  // },[])
  
  useEffect(() => {
    const users = async (profile) => {
      let users = {}
      let depts = [...profile.dept, "admin"]

      depts.map(async dept => {
        users[dept] = []
        if (dept === "admin") {
          await getUsers("users",profile.dept)
          .then(snapShot => {
            snapShot.forEach(doc => {
              users[dept] = [...users[dept], doc]
            })
          })
          .catch(error => {
            error && console.log(error.message)
          })
        } else {
          await getUsers("users",[dept])
          .then(snapShot => {
            snapShot.forEach(doc => {
              users[dept] = [...users[dept], doc]
            })
          })
          .catch(error => {
            error && console.log(error.message)
          })
        }
        return (
          dispatch(
            {
              type: "SET-OBJ",
              name: "users",
              load: users
            }
          )
        )
      })
    }
    
    const getColls = async (profile) => {
      let colls = []
      await profile.dept.map(async col => {
        await getData(col)
        .then(coll => {
          colls.push(coll.arr)
        })
        return (
          dispatch({
            type:"INIT",
            colls: colls,
            view: colls[0],
            profile: profile,
          })
        )
      })
    }

    const init = async () => {
      // console.log(user)
      await getUser(user)
      .then((userDoc) => {
        // console.log(userDoc)
        getColls(userDoc)
        if (userDoc.level < 1){
          users(userDoc)
        }
      })
    }

    if (user) {
      init()
    } else {
      // navigate('/')
      dispatch({type:"CLEAR"})
    }
  },[user])
  
  return (
    <div className={`w-full h-[100vh]`}>
    {user ?   
      view.length === 0?
      <Loading/>
      :
      <>
      <Header
      tabs={tabs[profile.role]}
      />
      <div className={`h-full flex justify-center items-around bg-clearBlack`}>
        {
          show && formObj &&
          <PopUpForm
          dept={view[0].dept}
          shifts={view[0].shifts}
          />
        }
        {
          showBid && formObj &&
          <BidForm
          dept={view[0].dept}
          shifts={view[0].shifts}
          />
        }
        {
          showWeek &&
          <MiscForm
          shifts={view && view[0].shifts}
          />
        }
        {
          view.length > 0 &&
          <Outlet/>
        }
      </div>
      </>
      :
      <LogIn/>
    }
    </div>
  )
}

export default App;
