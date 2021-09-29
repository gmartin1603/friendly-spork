import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { usePosValue } from '../context/PosContext';
import { writeData } from '../firebase/firestore';
import Counter from './Counter';
import Days from './Days';

function AddPos(props) {
    const [state, dispatch] = usePosValue()
    const [disabled, setDisabled] = useState(true)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        writeData(state)
        resetForm()
        dispatch({
            ...state,
            type: "UPDATE",
            update: !state.update
        })
    }
    const resetForm = () => {
        dispatch({
            type: "RESET",
            load: {
                pack : false,
                op: false,
                po: false,
                util : false,
                misc : false,
                job: "",
                five: false,
                seven: false,
                start: "",
                end: "",
                col: "Jobs",
                startTOD: true,
                endTOD: false,
                ee: "",
                update: false,
        }})
    }

    useEffect(() => {
        validate()
    }, [state,])

    const validate = () => {
        
        if ((state.job && state.start && state.end) && (state.pack || state.op || state.po || state.util) && (state.five || state.seven)) {
            setDisabled(false)
            console.log("Validated")
        }
        else setDisabled(true)
    }

    // const formatTime = (str, name) => {
        
    //     for (let i = 0; i < str.length; i++) {
    //         if (str.length === 1 && str[i] > 1) {
    //             let value = "0" + str[0] + ":00"
    //             setSS({...state, [name]: value })
                
    //         } else {
    //             let value = str[i]
    //             setSS({...state, [name]: value })
    //         }
    //     }
    // }

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
            <form action="">
            <h3>Create Position</h3>
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={state.pack}
                        disabled={state.op || state.po || state.util}
                        onClick={(e) => handleChange(e)}
                        color="primary"
                        name="pack"
                        />
                    }
                    label="Packaging Operator"
                    />
                
                
                <FormControlLabel
                    control={
                        <Checkbox
                        value="check"
                        checked={state.op}
                        disabled={state.pack || state.po || state.util}
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
                        value="check"
                        checked={state.po}
                        disabled={state.op || state.pack || state.util}
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
                        value="check"
                        checked={state.util}
                        disabled={state.op || state.po || state.pack}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="util"
                        />
                    }
                    label="Utility"
                    />
                </Box>
                <Fields>
                    <TextField name="job" onChange={(e) => {handleChange(e)}} value={state.job} required id="standard-required" label="Job Name" />
                    <TextField name="ee" onChange={(e) => {handleChange(e)}} value={state.ee} label="Assigned EE" />
                    <MatrixBox>
                        <FormControlLabel
                        control={
                            <Checkbox
                            value="check"
                            checked={state.five}
                            disabled={state.seven}
                            onChange={(e) => handleChange(e)}
                            color="primary"
                            name="five"
                            />
                        }
                        label="5 Day"
                        />
                        
                        <FormControlLabel
                        control={
                            <Checkbox
                            value="check"
                            checked={state.seven}
                            disabled={state.five}
                            onChange={(e) => handleChange(e)}
                            color="primary"
                            name="seven"
                            />
                        }
                        label="7 Day"
                        />
                        {
                            state.five? 
                                <Days/>
                                : 
                            state.seven?
                            
                                <Counter/>
                                :""
                        }
                    </MatrixBox>
                    <TimeBox>
                        <TextField name="start" onChange={(e) => {handleChange(e)}} value={state.start} maxLength={5}required id="standard-required" label="Start Time" />
                        {
                            state.startTOD?

                                <FormControlLabel
                                control={
                                    <Checkbox
                                    value="check"
                                    checked={state.startTOD}
                                    onChange={(e) => handleChange(e)}
                                    color="primary"
                                    name="startTOD"
                                    />
                                }
                                label="AM"
                                />
                                :
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    value="check"
                                    checked={state.startTOD}
                                    onChange={(e) => handleChange(e)}
                                    color="primary"
                                    name="startTOD"
                                    />
                                }
                                label="PM"
                                />
                                
                        }
                    </TimeBox>
                    <TimeBox>
                        <TextField name="end" onChange={(e) => {handleChange(e)}} value={state.end} required id="standard-required" label="End Time" />
                        {
                            state.endTOD?

                                <FormControlLabel
                                control={
                                    <Checkbox
                                    value="check"
                                    checked={state.endTOD}
                                    onChange={(e) => handleChange(e)}
                                    color="primary"
                                    name="endTOD"
                                    />
                                }
                                label="AM"
                                />
                                :
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    value="check"
                                    checked={state.endTOD}
                                    onChange={(e) => handleChange(e)}
                                    color="primary"
                                    name="endTOD"
                                    />
                                }
                                label="PM"
                                />
                                
                        }
                    </TimeBox>
                </Fields>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    disabled={disabled}
                    onClick={(e) => {handleSubmit(e)}}
                    >
                        CREATE POSITION
                </Button>
            </form>
        </Container>
    );
}


export default AddPos;

const Container = styled.div`
    max-width: 300px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    h3 {
        padding: 20px;
    }

    form {
        width: 75%;
        padding: 50px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        button {
            background-color: green;
            margin-top: 10px;
        }    
    }
`
const Box =styled.div`
    display: flex;
    flex-direction: column;

`

const Fields = styled.div`

`
const TimeBox = styled.div`
    display: flex;
`
const MatrixBox = styled.div`

`