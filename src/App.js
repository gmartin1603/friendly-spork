import { useEffect, useState } from 'react';
import './App.css';
import AdminApp from './components/AdminApp';
import EeApp from './components/EeApp';
import Header from './components/Header';
import LogIn from './components/LogIn';
import OpApp from './components/OpApp';
import { useAuthState } from './context/auth/AuthProvider';
import { writeData } from './firebase/firestore';
import { csst } from './testData/csstData'
import { casc } from './testData/cascData'
import { Outlet, useNavigate } from 'react-router-dom';


function App() {

  const {user, profile, colls, view} = useAuthState()
  const navigate = useNavigate()
  useEffect(() => {
    if (profile.role) {
      navigate(`/${profile.role}`)
    } else {
      navigate("/")
    }
  },[profile])

  const tabs = {
    admin: [
      {label:"Edit Schedual",link:`${profile.role}`}, 
      {label:"Edit Personnel",link:`${profile.role}/editEE`}, 
      {label:"Edit Positions",link:`${profile.role}/editJob`}, 
      {label:"App Settings",link:`${profile.role}/settings`}, 
    ],
    ee: [
      {label:"Schedual",link:`${profile.role}`}, 
      {label:"Postings",link:`${profile.role}/postings`},
      {label:"EE Dashboard",link:`${profile.role}/home`},
      {label:"App Settings",link:`${profile.role}/settings`},
    ],
    op: [
      {label:"Schedual",link:`${profile.role}`}, 
      {label:"Call In",link:`${profile.role}/callIn`},
      {label:"Postings",link:`${profile.role}/postings`},
      {label:"App Settings",link:`${profile.role}/settings`}, 
    ],
    sup: [
      
      {label:"Edit Schedual",link:`${profile.role}`}, 
      {label:"Current Postings",link:`${profile.role}/postings`}, 
      {label:"Archived Postings",link:`${profile.role}/oldPostings`}, 
      {label:"App Settings",link:`${profile.role}/settings`}, 
  
    ],
  }
 
  return (
    <div className={`w-screen`}>
    
    {
      profile.role?
      <>
      <Header
      tabs={tabs[profile.role]}
      />
      {
        view &&
        <Outlet/>
      }
      </>
      :
      <LogIn/>
    }
    </div>
  )
  
  // switch (profile?.role) {
  //   case 'ee':
  //     return (
  //       <>
  //       <Header name={profile.name} role={profile.role} tabs={['Home', 'Postings', 'Edit Profile']} />
  //       <EeApp rows={colls}/>
  //       </>
  //     )
  //   case 'sup':
  //     return (
  //       <>
  //       <SupApp profile={profile} />
  //       </>
  //     )
  //   case 'op':
  //     return(
  //       <>
        
  //       <OpApp rows={colls[0]} profile={profile} />
  //       </> 
  //     )
  //   case 'admin':
  //     return (
  //       <>
  //       <Header
  //       tabs={[
  //           {label:"Edit Personnel",link:'editEE'}, 
  //           {label:"Edit Positions",link:'editJob'}, 
  //           {label:"App Settings",link:'settings'}, 
  //       ]}
  //       />
  //       <AdminApp profile={profile} rows={colls} />
  //       </>
        
  //     )
  //   default:
  //   return (
  //     <LogIn/>
  //   )
  // }
    

}

export default App;
