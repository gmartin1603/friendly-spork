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



function App() {

  const [{
    formObj, 
    tabs, 
    view, 
    show, 
    showWeek, 
    showBid, 
    showCallin,
    profile,
    count,
  }, dispatch] = useAuthState()

  const user = useAuthChange()

  // useEffect(() => {
  //   // console.log(load)
  //   // writeData(load)
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

    
    const buildColumns = (today) => {
      //Daylight Savings check
      const jan = new Date(today.getFullYear(), 0, 1);
      // const jul = new Date(today.getFullYear(), 6, 1);
      // console.log(`Daylight Savings => ${today.getTimezoneOffset() < jan.getTimezoneOffset()}`)
      let day = 24 * 60 * 60 * 1000
      //  time = today - milliseconds past midnight + 1 hour if today.getTimezoneOffset < jan.getTimezoneOffset 
      let time = (today - ((today.getHours() * 60 * 60 * 1000) + (today.getMinutes() * 60 * 1000) + (today.getSeconds() * 1000) + today.getMilliseconds()))+(today.getTimezoneOffset() < jan.getTimezoneOffset()? (60*60*1000) : 0)
      let d = today.getDay()
      if (d === 0) {
        d = 7
      }
      //monday = time - (day of the week * ms in a day) + 1 day in ms
      let mon = time - (d * day) + day
      let columns = [
        {tag:'Monday', id: 1, label: mon + (day * count),  align: "center", },
        {tag:'Tuesday', id: 2, label: (mon + day) + (day * count), align: "center", },
        {tag:'Wednesday', id: 3, label: (mon + (day * 2)) + (day * count) , align: "center", },
        {tag:'Thursday', id: 4, label: (mon + (day * 3)) + (day * count) , align: "center", },
        {tag:'Friday', id: 5, label: (mon + (day * 4)) + (day * count) , align: "center", },
        {tag:'Saturday', id: 6, label: (mon + (day * 5)) + (day * count) , align: "center", },
        {tag:'Sunday', id: 7, label: (mon + (day * 6)) + (day * count) , align: "center", },
      ]
      // setCols(columns)
      dispatch({
        type:"SET-ARR",
        name:"cols",
        load: columns
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
        buildColumns(today)
        getColls(userDoc)
        if (userDoc.level < 3){
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
      </div>
      </>
      :
      <LogIn/>
    }
    </div>
  )
}

export default App;
