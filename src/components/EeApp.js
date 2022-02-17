import React from 'react';
import styled from 'styled-components'
import { getData } from '../firebase/firestore';
import Header from './Header';
import Schedual from './Schedual'

function EeApp({profile}) {

    return (
        <Main>
            <Header name={profile.name} role={profile.role} tabs={['Home', 'Postings', 'Edit Profile']} />
            <Schedual/>
        </Main>
    );
}

export default EeApp;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`