import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import LogIn from './components/LogIn';
import { useAuthState } from './context/auth/AuthProvider';
import { getData, getUser, getUsers } from './firebase/firestore';
import { Outlet } from 'react-router-dom';
import useAuthChange from './helpers/authStateChange';
import PopUpForm from './components/PopUpForm';
import MiscForm from './components/MiscForm';
import { csst } from './testData/csstData'
import { casc } from './testData/cascData'
import Loading from './components/Loading';


function App() {

  const [{formObj, tabs, view, show, showWeek, profile}, dispatch] = useAuthState()

  const user = useAuthChange()

  
  
  useEffect(() => {

    const users = async (profile) => {
      let users = {}
      let depts = [...profile.dept, "admin"]

      await depts.map(async dept => {
        users[dept] = []
        if (dept === "admin") {
          await getUsers("users",profile.dept)
          .then(snapShot => {
            snapShot.forEach(doc => {
              users[dept] = [...users[dept], doc]
            })
          })

        }
        await getUsers("users",[dept])
        .then(snapShot => {
          snapShot.forEach(doc => {
            users[dept] = [...users[dept], doc]
          })
        })
        .catch(error => {
          error && console.log(error.message)
        })
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
      dispatch(
        {
          type:"CLEAR",

        }
      )
    }
    
  },[user])
  

  

  
 
  return (
    <div className={`w-full min-h-screen bg-clearBlack`}>
    {
      user ?
      
      view.length === 0?
      <Loading/>
      :
      <>
      <Header
      tabs={tabs[profile.role]}
      />
      <div className={`flex justify-center items-around`}>
        {
          show && formObj &&
          <PopUpForm
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
