import React, { useState } from 'react';
import styled from 'styled-components'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import AddEE from './AddEE';
import AddPos from './AddPos';

function Landing(props) {
    return (
        <Main>
        <Header/>
        <Container>
            <AddEE/>
            <AddPos/>
        </Container>
        </Main>
    );
}

export default Landing;

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    

`
const Container = styled.div`
    display: flex;    
`
