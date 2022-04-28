import { useEffect, useLayoutEffect } from 'react';
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


function App() {

  const [{formObj, tabs, view, show, showWeek, profile}, dispatch] = useAuthState()

  const user = useAuthChange('')

  
  
  useEffect(() => {

    const users = async (profile) => {
      let users = {}
      await profile.dept.map(async dept => {
        users[dept] = []
        await getUsers("users",dept)
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
      console.log(user)
      await getUser(user)
      .then((userDoc) => {
        console.log(userDoc)
        getColls(userDoc)
        users(userDoc)
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
    <div className={`w-screen`}>
    
    {
      view.length > 0?
      <>
      <Header
      tabs={tabs[profile.role]}
      />
      {
          show && formObj &&
          <PopUpForm
          dept={view && view[0].dept}
          shifts={view && view[0].shifts}
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
        
      
      </>
      :
      <LogIn/>
    }
    </div>
  )
}

export default App;
