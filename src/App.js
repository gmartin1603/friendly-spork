import { useEffect, useState } from 'react';
import './App.css';
import AdminApp from './components/AdminApp';
import EeApp from './components/EeApp';
import Header from './components/Header';
import LogIn from './components/LogIn';
import OpApp from './components/OpApp';
import { useAuthState } from './context/auth/AuthProvider';
// import { getData } from './firebase/firestore';



function App() {

  const {profile, colls} = useAuthState()
  

  const util = async () => {
    const data = {
      // coll: formObj.dept.toString(),
      coll: 'messages',
      doc: 'rota',
      field: 'shifts',
      data: [{id:'seg', segs: ['7 AM - 3 PM', '7 AM - 11 AM', '11 AM - 3 PM']}],
    }

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
    //util()
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
        <Header name={profile.dName} role={profile.role} tabs={['Home', 'CASC', 'CSST', 'Manage', 'Edit Profile']} />
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
