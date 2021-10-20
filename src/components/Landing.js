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

    const test = [
        {
            qual: "op", five: true, job: "ETR Op",
            coverage: [
                {shift: 1, ee: "Jeff M", week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: "Jeff K", week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
                {shift: 3, ee: "Jake", week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"op", five: true, job: "ETR Op #2",
            coverage: [
                {shift: 1, ee: "Jason L", week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: "Tom N", week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
                {shift: 3, ee: "Courtny", week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"op", five: true, job: "FLR Op",
            coverage: [
                {shift: 1, ee: "Doug", week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: "Juan", week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
                {shift: 3, ee: "Daryl", week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"pack", five: true, job: "ETR Pack",
            coverage: [
                {shift: 1, ee: "Tony", week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: "DJ", week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 3, ee: "Louis", week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
    ]

    return (
        <Main>
        <Header/>
        <Container>
            {/* <EeProvider initialState={eeState} reducer={eeReducer}>
                <AddEE/>
            </EeProvider> */}
            {/* <PosProvider initialState={posState} reducer={posReducer}>
                <AddPos/>
            </PosProvider> */}
            <ScheProvider initialState={scheState} reducer={scheReducer}>
                <Schedual
                    load={test}
                    date={date}
                />
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
`
