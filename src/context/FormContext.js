import React, {createContext, useContext, useReducer} from 'react'

export const FormContext = createContext();

export const FormProvider = ({reducer, initialState, children}) => (
    <FormContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </FormContext.Provider>
)

export const useFormValue = () => useContext(FormContext)