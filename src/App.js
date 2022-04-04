import { useEffect, useState } from 'react';
import './App.css';
import AdminApp from './components/AdminApp';
import EeApp from './components/EeApp';
import Header from './components/Header';
import LogIn from './components/LogIn';
import OpApp from './components/OpApp';
import { useAuthState } from './context/auth/AuthProvider';
import { getUser, writeData } from './firebase/firestore';
// import { getData } from './firebase/firestore';



function App() {

  const {rows, profile} = useAuthState()


  const handleResize = () => {
    writeData('csst', {
      id: 'etcl',
      label: 'ETR Clean Up',
      order: 10,
      first: true,
      second: true,
      third: true,
    })
  }
  
  // console.log(rows)
  
  switch (profile?.role) {
    case 'ee':
      return (<>
        <Header name={profile.name} role={profile.role} tabs={['Home', 'Postings', 'Edit Profile']} />
        <EeApp rows={rows}/>
      </>)
    case 'sup':
      return <SupApp profile={profile} />
    case 'op':
      return(
        <>
          <Header name={profile.dName} role={profile.role} tabs={['Home', 'CASC', 'CSST', 'Manage', 'Edit Profile']} />
          <OpApp rows={rows[0]} profile={profile} />
        </> 
      )
    case 'admin':
      return (
        <>
          <Header name={profile.dName} role={profile.role} tabs={['Home', 'CASC', 'CSST', 'Manage', 'Edit Profile']} />
          <AdminApp rows={rows} />
        </>
      )
    default:
    return (
      <LogIn/>
    )
  }
}

export default App;
