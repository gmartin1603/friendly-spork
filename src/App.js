import { useEffect, useState } from 'react';
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

  useEffect(() => {
    // handleResize()
    // console.log(new Date('02/22/2022'))
  },[])


  // useEffect(() => {

  //   const getUser = "http://localhost:5000/overtime-management-83008/us-central1/getUser"
  //   const newUser = "http://localhost:5000/overtime-management-83008/us-central1/newUser"

  //   const POST = {
  //     method: 'POST',
  //     body: {
  //       email: 'george@example.com',
  //       emailVerified: false,
  //       phoneNumber: '+13199810054',
  //       password: 'secret',
  //       displayName: 'George Martin',
  //       disabled: false,
  //     },
  //   }
    
  //   async function fetchData() { 
  //       await fetch(newUser,POST)
  //         .then((res) => console.log(res.json()))
          
  //         .catch((err) => {
  //           console.warn(err)
  //         })
  //   }
  //   fetchData()

    
  // }, [])

  

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
  
  console.log(rows)
  
  switch (profile.role) {
    case 'ee':
      return (<>
        <Header name={profile.name} role={profile.role} tabs={['Home', 'Postings', 'Edit Profile']} />
        <EeApp rows={rows}/>
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
