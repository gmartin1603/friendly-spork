import { onAuthStateChanged, signOut, signInWithEmailAndPassword, getAuth, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import React, {createContext, useContext, useEffect, useReducer, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/auth';
import { getData, getUser, getUsers, writeData } from '../../firebase/firestore';
import useAuthChange from '../../helpers/authStateChange';

export const AuthContext = createContext();



export const AuthProvider = ({ children, reducer, initialState, dispatch }) => {
    
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState, dispatch)}>
        {children}
    </AuthContext.Provider>
)}

export const useAuthState = () => useContext(AuthContext)