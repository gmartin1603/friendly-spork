import React, { useState } from 'react';
import styled from 'styled-components'
import { useAuthState } from '../context/auth/AuthProvider';
import {signin} from '../firebase/auth'

function LogIn(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const {signin} = useAuthState()

        
    

    return (
        <div className='h-full flex items-center justify-center'>
            <div className='bg-todayGreen w-min h-min p-.05 flex '>
                <form>
                    <div className="username">
                        <label htmlFor="username">User Name</label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    </div>
                    <div className="mb-.05">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className='bg-blue p-.01 w-full border' type="submit" onClick={(e) => {e.preventDefault(); signin(userName, password)}}>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

`
const FormContainer = styled.div`
    width: 20%;
    min-width: 400px;
    height: 30%;
    min-height: 300px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50%;

        button {
            height: 30px;
            background-color: ;
        }
`
const Input = styled.div`
    label {
        padding: 10px;
    }
`