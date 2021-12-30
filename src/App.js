import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Landing from './components/Landing';
import LogIn from './components/LogIn';
import { getData } from './firebase/firestore';

function App() {

  const [load, setLoad] = useState([])
  const [date, setDate] = useState(new Date(2018, 0, 1))

  useEffect( () => {
    getData("Jobs").then((promise) => {
      setLoad(promise)
    }).catch(error => console.log(error))
  },[])

  return (
    <Main>
      {/* <LogIn/> */}
      <Landing
        
      />
    </Main>
  );
}

export default App;

const Main = styled.div `

`