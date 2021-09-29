import React, {createContext, useContext, useReducer} from 'react'

export const PosContext = createContext();

export const PosProvider = ({reducer, initialState, children, dispatch}) => (
    <PosContext.Provider value={useReducer(reducer, initialState, dispatch)}>
        {children}
    </PosContext.Provider>
)

export const usePosValue = () => useContext(PosContext)