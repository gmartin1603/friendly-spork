import React, { useState } from 'react';
import styled from 'styled-components'
import {signin} from '../firebase/auth'

function LogIn(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (userName, password) => {
        console.log("User Name: ", userName, "Password: ", password)
        signin(userName, password)
    }

    return (
        <Container>
            <FormContainer>
                <Form>
                    <Input className="username">
                        <label htmlFor="username">User Name</label>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    </Input>
                    <Input className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Input>
                    <button type="submit" onClick={() => handleSubmit(userName, password)}>Log In</button>
                </Form>
            </FormContainer>
        </Container>
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