import React from 'react';
import styled from 'styled-components'
import Header from './Header';
import AddEE from './AddEE';
import AddPos from './AddPos';
import Schedual from './Schedual';
import { PosProvider } from '../context/PosContext';
import {EeProvider} from '../context/EeContext';
import posReducer, { posState } from '../context/posReducer';
import eeReducer, { eeState } from '../context/eeReducer';
import { ScheProvider } from '../context/ScheContext';
import scheReducer, { scheState } from '../context/scheReducer';

function Landing({ load, date }) {

    
    

    return (
        <Main>
        <Header/>
        <Container>
            <EeProvider initialState={eeState} reducer={eeReducer}>
                <AddEE
                    jobs={[]}
                />
            </EeProvider>
            <PosProvider initialState={posState} reducer={posReducer}>
                <AddPos/>
            </PosProvider>
            <ScheProvider initialState={scheState} reducer={scheReducer}>
                <Schedual/>
            </ScheProvider>
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
    flex-direction: column-reverse;
    flex-wrap: wrap;    
`
