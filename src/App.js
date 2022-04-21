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

 
  return (
    <>
    
    {
      profile.role?
      <>
      <Header
      tabs={[
          {label:"Edit Schedual",link:'admin'}, 
          {label:"Edit Personnel",link:'admin/editEE'}, 
          {label:"Edit Positions",link:'editJob'}, 
          {label:"App Settings",link:'settings'}, 
      ]}
      />
      {
        view &&
        <Outlet/>
      }
      </>
      :
      <LogIn/>
    }
    </>
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
