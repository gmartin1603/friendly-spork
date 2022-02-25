import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import AdminApp from './components/AdminApp';
import EeApp from './components/EeApp';
import Header from './components/Header';
import LogIn from './components/LogIn';
import { useAuthState } from './context/auth/AuthProvider';
import { getUser, writeData } from './firebase/firestore';
// import { getData } from './firebase/firestore';

function App() {

  const {rows, profile} = useAuthState()

  const handleResize = () => {
    
  }
  
  console.log(rows)
  
  switch (profile.role) {
    case 'ee':
      return (<>
        <Header name={profile.name} role={profile.role} tabs={['Home', 'Postings', 'Edit Profile']} />
        <EeApp profile={profile}/>
      </>)
    case 'sup':
      return <SupApp profile={profile} />
    case 'op':
      return <OpApp profile={profile} />
    case 'admin':
      return (
        <>
          <Header name={profile.name} role={profile.role} tabs={['Home', 'CASC', 'CSST', 'Manage', 'Edit Profile']} />
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
