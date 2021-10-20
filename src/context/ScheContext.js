import React, {createContext, useContext, useReducer} from 'react'

export const ScheContext = createContext();

export const ScheProvider = ({reducer, initialState, children, dispatch}) => (
    <ScheContext.Provider value={useReducer(reducer, initialState, dispatch)}>
        {children}
    </ScheContext.Provider>
)

export const useScheValue = () => useContext(ScheContext)