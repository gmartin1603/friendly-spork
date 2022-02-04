import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import {getData, writeData} from '../firebase/firestore'
import {createUser} from '../firebase/auth'
import { useEeValue } from '../context/EeContext';
import Jobs from './Jobs';



function AddEE({jobs}) {

    const [state, dispatch] = useEeValue()

    const [disabled, setDisabled] = useState(true)
    const [pass, setPass] = useState("")
    
    

    useEffect(() => {
        validate()
        // console.log(state)
    } )

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("EE File => ", state)
        // console.log("Auth File => ", {email: state.email, password: pass})
        // writeData(state)
        createUser({email: state.email, password: pass})
        // resetForm()
    }
    const resetForm = () => {
        setPass("")
        dispatch({
            type: "RESET",
            load: {
                pack : false,
                op: false,
                po: false,
                util : false,
                misc : false,
                first: "",
                last: "",
                startDate: "",
                email: "",
                col: "EEs",
                update: false,
        }})
    }

    const validate = () => {
        if (state.first && state.last && state.email && pass && state.startDate !== "") {
            setDisabled(false)
        }
        else setDisabled(true)
    }

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value, e.target.checked, e.type)
        if (e.target.value === "check") {
            dispatch({
                type: "TOGGLE-CHECK",
                checked: e.target.checked,
                name: e.target.name
            })
        } else if (e.target.name) {

            dispatch({
                ...state, 
                type: "SET-TEXT",
                name: e.target.name,
                change: e.target.value 
            })
                    
        }
        else console.log("*No State Change Made: No Name*", state)
        
    } 
    
    
    return (
        <Container>
            <form action="submit">
                <h3>Add Employee</h3>
                <TextField name="first" onChange={(e) => {handleChange(e)}} value={state.first} required id="standard-required" label="First Name" />
                <TextField name="last" onChange={(e) => {handleChange(e)}} value={state.last} required id="standard-required" label="Last Name" />
                <TextField
                    name="startDate"
                    required
                    label="Start Date"
                    type="date"
                    value={state.startDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {handleChange(e)}}
                />
                <TextField name="email" onChange={(e) => {handleChange(e)}} value={state.email} required id="standard-required" label="Email" />
                <TextField name="password" onChange={(e) => {setPass(e.target.value)}} value={pass} required id="standard-required" label="Password" />
                <TextField type="number" maxValue={3} name="shift" onChange={(e) => {handleChange(e)}} value={state.shift} id="standard-required" label="Shift" />
                
                {
                    jobs.length > 0 
                    &&
                    jobs.map((job) => {
                        
                        let ck = job.qual
                        // console.log(state[ck])
                        return (
                            <CheckBox>
                                <div>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            value="check"
                                            checked={state[`${ck}Main`]}
                                            disabled={!state[ck]}
                                            onChange={(e) => handleChange(e)}
                                            color="primary"
                                            name={`${ck}Main`}
                                        />
                                    }
                                    label="Primary"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            value="check"
                                            checked={state[ck]}
                                            onChange={(e) => handleChange(e)}
                                            color="primary"
                                            name={ck}
                                        />
                                    }
                                    label={job.label}
                                    />
                                </div>
                                <Jobs
                                    category= {job.positions}
                                    hidden={state[ck]}
                                    main={state[`${ck}Main`]}
                                />
                            </CheckBox>
                        )
                        })
                }
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
    min-width: 400px;
    margin: 1%;
    border: 5px solid;
    border-color: rgb(27, 102, 15, 0.5);
    border-radius: 10px;
    box-shadow: 0px 2px 5px;
    display: flex;
    justify-content: center;
    padding: 2%;
    form {
        width: 75%;
        display: flex;
        flex-direction: column;
            Button {
                background-color: green;
            }
    }
`
const CheckBox = styled.div`
    
`