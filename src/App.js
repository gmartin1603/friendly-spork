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


function App() {

  const {profile, colls} = useAuthState()
  
  const data = {
    coll: "csst",
    // coll: "casc",
    doc: "rota",
    field: 'shifts',
    data: csst.rota.shifts,
  }

  const util = async () => {

    // const URL ="http://localhost:5000/overtime-management-83008/us-central1/fsApp/updateDoc"
    const URL ="https://us-central1-overtime-management-83008.cloudfunctions.net/fsApp/updateDoc"

    await fetch(URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
    }).then((res) => {
        console.log(res)
        closeForm()
    })
    .catch((err) => {
        console.warn(err)
    })

  }

  useEffect(() => {
    // writeData(data)
    console.log(csst.rota.shifts)
  },[])
  
  // console.log(rows)
  
  switch (profile?.role) {
    case 'ee':
      return (
        <>
        <Header name={profile.name} role={profile.role} tabs={['Home', 'Postings', 'Edit Profile']} />
        <EeApp rows={colls}/>
        </>
      )
    case 'sup':
      return (
        <>
        <SupApp profile={profile} />
        </>
      )
    case 'op':
      return(
        <>
        <Header name={profile.dName} role={profile.role} tabs={['Home', 'CASC', 'CSST', 'Manage', 'Edit Profile']} />
        <OpApp rows={colls[0]} profile={profile} />
        </> 
      )
    case 'admin':
      return (
        <>
        <AdminApp profile={profile} rows={colls} />
        </>
      )
    default:
    return (
      <LogIn/>
    )
  }
}

export default App;
