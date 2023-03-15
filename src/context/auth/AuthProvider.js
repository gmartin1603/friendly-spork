import React, {createContext, useContext, useReducer} from 'react'


export const AuthContext = createContext();

export const AuthProvider = ({ children, reducer, initialState, dispatch }) => {

  return (
    <AuthContext.Provider value={useReducer(reducer, initialState, dispatch)}>
        {children}
    </AuthContext.Provider>
)}

export const useAuthState = () => useContext(AuthContext)