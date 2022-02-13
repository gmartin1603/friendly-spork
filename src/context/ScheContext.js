import React, {createContext, useContext, useEffect, useReducer, useState} from 'react'
import { getData } from '../firebase/firestore';

export const ScheContext = createContext();

export const ScheProvider = ({reducer, initialState, children, dispatch}) => {
    const [rows, setRows] = useState()

    useEffect(() => {
        console.log("Context")
        getData("casc")
    },[])
    return (
    <ScheContext.Provider value={ useReducer(reducer, initialState, dispatch)}>
        {children}
    </ScheContext.Provider>
)}

export const useScheValue = () => useContext(ScheContext)