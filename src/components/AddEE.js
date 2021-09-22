import React, { useState } from 'react';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {writeData} from '../firebase/firestore'
import {createUser} from '../firebase/auth'



function AddEE(props) {
    const [disabled, setDisabled] = useState(true)
    const [storeState, setSS] = useState({
            pack : false,
            op: false,
            po: false,
            util : false,
            misc : false,
            first: "",
            last: "",
            col: "EEs",
            startDate: "",
    })
    const [authState, setAS] = useState({
            password: "",
            email: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        writeData(storeState)
        createUser(authState)
        resetForm()
    }
    const resetForm = () => {
        setSS({
            pack : false,
            op: false,
            po: false,
            util : false,
            misc : false,
            first: "",
            last: "",
            startDate: "",
            col: "EEs"
        })
        setAS({
            email: "",
            password: "",
        })
    }

    const validate = () => {
        if (storeState.first && storeState.last && authState.email && authState.password && storeState.startDate !== "") {
            setDisabled(false)
        }
        else return
    }


    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value, e.target.checked, e.type)
        if (e.target.name) {
        //     setSS({...storeState, [e.target.name]: e.target.checked })
        //     console.log(e)
        // }
        // else if (e.target.name) {

            switch (e.target.name) {
                case "email":
                    setAS({...authState, [e.target.name]: e.target.value})
                break

                case "password":
                    setAS({...authState, [e.target.name]: e.target.value})
                break
                case "first":
                    setSS({...storeState, [e.target.name]: e.target.value })
                break
                case "last":
                    setSS({...storeState, [e.target.name]: e.target.value })
                break
                case "startDate":
                    setSS({...storeState, [e.target.name]: e.target.value })
                break

                case "op":
                    setSS({...storeState, [e.target.name]: !storeState.op })
                    // console.log(storeState.op)
                break

                case "po":
                    setSS({...storeState, [e.target.name]: !storeState.po })
                    // console.log(storeState.op)
                break

                case "pack":
                    setSS({...storeState, [e.target.name]: !storeState.pack })
                    // console.log(storeState.op)
                break

                case "util":
                    setSS({...storeState, [e.target.name]: !storeState.util })
                    // console.log(storeState.op)
                break

                case "misc":
                    setSS({...storeState, [e.target.name]: !storeState.misc })
                    // console.log(storeState.op)
                break 

                default: (
                    console.log("*No State Change Made: No Switch*", storeState)
                )
            }

            // setSS({...storeState, [e.target.name]: e.target.value })
            validate()
            // console.log(storeState)
        }
        else console.log("*No State Change Made: No Name*", storeState)
        
    } 
    
    return (
        <Container>
            <form action="submit">
                <h3>Add Employee</h3>
                <TextField name="first" onChange={(e) => {handleChange(e)}} value={storeState.first} required id="standard-required" label="First Name" />
                <TextField name="last" onChange={(e) => {handleChange(e)}} value={storeState.last} required id="standard-required" label="Last Name" />
                <TextField
                    name="startDate"
                    required
                    label="Start Date"
                    type="date"
                    value={storeState.startDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {handleChange(e)}}
                />
                <TextField name="email" onChange={(e) => {handleChange(e)}} value={authState.email} required id="standard-required" label="Email" />
                <TextField name="password" onChange={(e) => {handleChange(e)}} value={authState.password} required id="standard-required" label="Password" />

                <FormControlLabel
                    control={
                    <Checkbox
                        checked={storeState.pack}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="pack"
                    />
                    }
                    label="Packaging Operator"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={storeState.op}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="op"
                    />
                    }
                    label="CSST Operator"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={storeState.po}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="po"
                    />
                    }
                    label="CASC Operator"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={storeState.util}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="util"
                    />
                    }
                    label="Utility"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={storeState.misc}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="misc"
                    />
                    }
                    label="Misc"
                />
                

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    disabled={disabled}
                    onClick={(e) => {handleSubmit(e)}}
                    >
                        Create Employee
                </Button>
            </form>
        </Container>
    );
}

export default AddEE;

const Container = styled.div`
    min-width: 150px;
    form {
        width: 75%;
        padding: 50px;
        display: flex;
        flex-direction: column;
            Button {
                background-color: green;
            }
    }
`