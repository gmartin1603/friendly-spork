import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import AdminApp from './components/AdminApp';
import EeApp from './components/EeApp';
import Landing from './components/Landing';
import LogIn from './components/LogIn';
import { useAuthState } from './context/auth/AuthProvider';
import { getUser, writeData } from './firebase/firestore';
// import { getData } from './firebase/firestore';

function App() {

  const {user, profile} = useAuthState()

  
  
  
  
  switch (profile.role) {
    case 'ee':
      return <EeApp profile={profile}/>
    case 'sup':
      return <SupApp profile={profile} />
    case 'op':
      return <OpApp profile={profile} />
    case 'admin':
      return <AdminApp profile={profile} />
    default:
    return (
      <LogIn/>
    )
  }
}

export default App;

const Main = styled.div `

`