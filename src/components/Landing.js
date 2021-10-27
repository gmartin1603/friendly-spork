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
                {shift: 1, ee: {"1":"Jeff M", "2": "Doug", "3": "Jason L",}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: {"1":"Jeff K", "2": "Tom N", "3": "Juan",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
                {shift: 3, ee: {"1":"Jake", "2": "Courtney", "3": "Daryl",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"op", five: true, job: "ETR Op #2",
            coverage: [
                {shift: 1, ee: {"1":"Jason L", "2": "Jeff M", "3": "Doug",}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: {"1":"Juan", "2": "Jeff K", "3": "Tom N",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
                {shift: 3, ee: {"1":"Daryl", "2": "Jake", "3": "Courtney",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"op", five: true, job: "FLR Op",
            coverage: [
                {shift: 1, ee: {"1":"Doug", "2": "Jason L", "3": "Jeff M",}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: {"1":"Tom N", "2": "Juan", "3": "Jeff K",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
                {shift: 3, ee: {"1":"Courtney", "2": "Daryl", "3": "Jake",}, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"pack", five: true, job: "ETR Pack",
            coverage: [
                {shift: 1, ee: {"1":"Tony", "2": "Jason M", "3": "Russ", "4": "Brian", "5": "Lee"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: {"1":"Matt", "2": "DJ", "3": "George", "4": "James"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 3, ee: {"1":"Louis", "2": "Rusty", }, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"pack", five: true, job: "Pack Float",
            coverage: [
                {shift: 1, ee: {"1":"Lee", "2": "Tony", "3": "Jason M", "4": "Russ", "5": "Brian"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: {"1":"James", "2": "Matt", "3": "DJ", "4": "George"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
            ]
        },
        {
            qual:"pack", five: true, job: "FLR Pack",
            coverage: [
                {shift: 1, ee: {"1":"Brian", "2": "Lee", "3": "Tony", "4": "Jason M", "5": "Russ"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: {"1":"George", "2": "James", "3": "Matt", "4": "DJ"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 3, ee: {"1":"Rusty", "2": "Louis", }, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"pack", five: true, job: "Bulk Bag",
            coverage: [
                {shift: 1, ee: {"1":"Russ", "2": "Brian", "3": "Lee", "4": "Tony", "5": "Jason M"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 2, ee: {"1":"DJ", "2": "George", "3": "James", "4": "Matt"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                {shift: 3, ee: {"1":"Becky", }, week: {mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: true}},
            ]
        },
        {
            qual:"pack", five: true, job: "Warehouse",
            coverage: [
                {shift: 1, ee: {"1":"Jason M", "2": "Russ", "3": "Brian", "4": "Lee", "5": "Tony"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
                // {shift: 2, ee: {"1":"George", "2": "James", "3": "Matt", "4": "DJ"}, week: {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false}},
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
            <PosProvider initialState={posState} reducer={posReducer}>
                <AddPos/>
            </PosProvider>
            {/* <ScheProvider initialState={scheState} reducer={scheReducer}>
                <Schedual
                    load={test}
                    date={date}
                />
            </ScheProvider> */}
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
