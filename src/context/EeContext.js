import React, {createContext, useContext, useReducer} from 'react'

export const EeContext = createContext();

export const EeProvider = ({reducer, initialState, children, dispatch}) => (
    <EeContext.Provider value={useReducer(reducer, initialState, dispatch)}>
        {children}
    </EeContext.Provider>
)

export const useEeValue = () => useContext(EeContext)