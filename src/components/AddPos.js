import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { writeData } from '../firebase/firestore';
import Counter from './Counter';
import Days from './Days';

function AddPos(props) {
    const [disabled, setDisabled] = useState(true)
    // const [startDisplay, setStart] = useState("")
    // const [endDisplay, setEnd] = useState("")
    const [storeState, setSS] = useState({
            pack : false,
            op: false,
            po: false,
            util : false,
            misc : false,
            job: "",
            start: "",
            end: "",
            five: false,
            seven: false,
            col: "Jobs",
            startTOD: true,
            endTOD: false,
            ee: "",
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        writeData(storeState)
        resetForm()
    }
    const resetForm = () => {
        setSS({
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
        })
    }

    useEffect(() => {
        validate()
    })

    const validate = () => {
        
        if ((storeState.job && storeState.start && storeState.end) && (storeState.pack || storeState.op || storeState.po || storeState.util) && (storeState.five || storeState.seven)) {
            setDisabled(false)
            console.log("Validated")
        }
        else setDisabled(true)
    }

    const formatTime = (str, name) => {
        
        for (let i = 0; i < str.length; i++) {
            if (str.length === 1 && str[i] > 1) {
                let value = "0" + str[0] + ":00"
                setSS({...storeState, [name]: value })
                
            } else {
                let value = str[i]
                setSS({...storeState, [name]: value })
            }
        }
    }

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value, e.target.checked, e.type)
        if (e.target.name) {

            switch (e.target.name) {
                case "start":
                    setSS({...storeState, [e.target.name]: e.target.value })
                    // formatTime(e.target.value, e.target.name)
                    // console.log(storeState.start)
                break

                case "end":
                    setSS({...storeState, [e.target.name]: e.target.value })
                break
                case "job":
                    setSS({...storeState, [e.target.name]: e.target.value })
                break
                case "ee":
                    setSS({...storeState, [e.target.name]: e.target.value })
                break
                case "seven":
                    setSS({...storeState, [e.target.name]: !storeState.seven })
                break
                case "startTOD":
                    setSS({...storeState, [e.target.name]: !storeState.startTOD })
                break
                case "endTOD":
                    setSS({...storeState, [e.target.name]: !storeState.endTOD })
                break
                case "five":
                    setSS({...storeState, [e.target.name]: !storeState.five })
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
                    console.log(storeState.pack)
                break

                case "util":
                    setSS({...storeState, [e.target.name]: !storeState.util })
                    // console.log(storeState.op)
                break 

                default: (
                    console.warn("*No State Change Made: No Switch*", storeState)
                )
            }
            // console.log(storeState)
        }
        else console.warn("*No State Change Made: No Name*", storeState)
        
    }

    return (
        <Container>
            <h3>Create Position</h3>
            <form action="">
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={storeState.pack}
                        disabled={storeState.op || storeState.po || storeState.util}
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
                        checked={storeState.op}
                        disabled={storeState.pack || storeState.po || storeState.util}
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
                        disabled={storeState.op || storeState.pack || storeState.util}
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
                        disabled={storeState.op || storeState.po || storeState.pack}
                        onChange={(e) => handleChange(e)}
                        color="primary"
                        name="util"
                        />
                    }
                    label="Utility"
                    />
                </Box>
                <Fields>
                    <TextField name="job" onChange={(e) => {handleChange(e)}} value={storeState.job} required id="standard-required" label="Job Name" />
                    <TextField name="ee" onChange={(e) => {handleChange(e)}} value={storeState.ee} label="Assigned EE" />
                    <MatrixBox>
                        <FormControlLabel
                        control={
                            <Checkbox
                            checked={storeState.five}
                            disabled={storeState.seven}
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
                            checked={storeState.seven}
                            disabled={storeState.five}
                            onChange={(e) => handleChange(e)}
                            color="primary"
                            name="seven"
                            />
                        }
                        label="7 Day"
                        />
                        {
                            storeState.five? 
                                <Days/>
                                : 
                            storeState.seven?
                            <div>
                                <Counter/>
                                {/* <Days/> */}
                            </div>
                                :""
                        }
                    </MatrixBox>
                    <TimeBox>
                        <TextField name="start" onChange={(e) => {handleChange(e)}} value={storeState.start} maxLength={5}required id="standard-required" label="Start Time" />
                        {
                            storeState.startTOD?

                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={storeState.startTOD}
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
                                    checked={storeState.startTOD}
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
                        <TextField name="end" onChange={(e) => {handleChange(e)}} value={storeState.end} required id="standard-required" label="End Time" />
                        {
                            storeState.endTOD?

                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={storeState.endTOD}
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
                                    checked={storeState.endTOD}
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