import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import LogIn from './components/LogIn';
import { useAuthState } from './context/auth/AuthProvider';
import { getData, getUser, getUsers, writeData } from './firebase/firestore';
import { Outlet } from 'react-router-dom';
import useAuthChange from './helpers/authStateChange';
import PopUpForm from './components/PopUpForm';
import MiscForm from './components/MiscForm';
import Loading from './components/Loading';
import BidForm from './components/forms/BidForm';
import Callin from './components/forms/Callin';
import RenderInWindow from './components/RenderInWindow';
import useWindowSize from './helpers/windowSize';
import WeekBar from './components/WeekBar';


function App() {

  const [{
    formObj,
    tabs,
    view,
    show,
    showWeek,
    showBid,
    showCallin,
    wkBar,
    profile,
    count,
  }, dispatch] = useAuthState()

  const user = useAuthChange()

  const [width, height] = useWindowSize([0,0]);

  const version = {
    version: "Version 4.0",
    notes: `Added 11am-7pm Util Cover shift. Database and performance improvements.`
  }

const ele = require('./private/casc/ele.json')
  const docs = [ele]

  // useEffect(() => {
  //   docs.map(doc => {
  //     let load = {
  //       coll: "casc",
  //       doc: doc.id,
  //       data: doc

  //     }
  //     console.log(doc)
  //     // writeData(load)
  //   })
  // },[])

  // app init
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
      const today = new Date()
      dispatch({
        type:"SET-VALUE",
        name:"today",
        load: today
      })
      // console.log(user)
      await getUser(user)
      .then((userDoc) => {
        // console.log(userDoc)
        // buildColumns(today)
        getColls(userDoc)
        if (userDoc.level < 3){
          users(userDoc)
        }
      })
    }

    if (user) {
      console.log(version)
      init()
    } else {
      // navigate('/')
      dispatch({type:"CLEAR"})
    }
  },[user])

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden bg-clearBlack`}>
    {user ?
      view.length === 0?
      <Loading/>
      :
      <>
      <Header
      tabs={tabs[profile.role]}
      />
      <div className={`w-full flex flex-col justify-center items-around `}>
        {
          show && formObj &&
          <PopUpForm
          dept={view[0].dept}
          shifts={view[0].shifts}
          />
        }{
          showCallin &&
          <RenderInWindow>
          <Callin/>
          </RenderInWindow>
        }{
          showBid && formObj &&
          <BidForm
          dept={view[0].dept}
          shifts={view[0].shifts}
          />
        }{
          showWeek &&
          <MiscForm
          shifts={view && view[0].shifts}
          />
        }{
          view.length > 0 &&
          <Outlet/>
        }
        {
          wkBar &&
          <WeekBar
          />
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
