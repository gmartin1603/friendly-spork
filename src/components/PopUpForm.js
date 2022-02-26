import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../context/auth/AuthProvider';

function PopUpForm({type, show}) {

    const {formObj, toggleForm} = useAuthState({})

    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [night, setNight] = useState(false)
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [shiftTag, setShiftTag] = useState('')
    const [downDate, setDownDate] = useState('')
    const[disabled, setDisabled] = useState(true)

    const shifts = {
        1: {label:'1st Shift', segs: ['7 AM to 11 AM', '11 AM to 3 PM']},
        2: {label:'2nd Shift', segs: []},
        3: {label:'3rd Shift', segs: []},
        4: {label:'Night Shift', segs: []},
    }

    const buildSegments = () => {
        shifts[formObj.shift].segs.map(seg => {
            <input type="checkbox" name="seg" id="seg" onChange={(e) => handleChange(e)}/>
        })
    }

    useEffect(() => {
        console.log(downDate)
        switch (formObj?.shift) {
            case 0 :
                setFirst(true)
                setShiftTag('1st Shift')
                break;
            case 1: 
                setSecond(true)
                setShiftTag('2nd Shift')
                break;
            case 2: 
                setThird(true)
                setShiftTag('3rd Shift')
                break;
            default:
                return;
        }
    })

    useEffect(() => {
        if (downDate !== '') {
            if (one || two || three) {
                setDisabled(false)
            }
        }
    },[one, two, three, downDate])

    const closeForm = () => {
        toggleForm()
        setFirst(false)
        setSecond(false)
        setThird(false)
        setNight(false)
        setDownDate('')
    }

    return (
        show ?
        <BackDrop>
            <Form action="posting">
                <Close onClick={() => closeForm()}>
                    <p>Close</p>
                </Close>
                <h1>New Overtime Posting</h1>
            <TextField 
            id="standard-basic" 
            label="Position" 
            variant="standard" 
            value={`${formObj?.pos} ${shiftTag}` }
            InputLabelProps={{
                shrink: true,
              }}
            />
            <span>
            <TextField 
            id="standard-basic"
            type="text"
            value={new Date(formObj?.date).toDateString()} 
            variant="standard"
            label='Date of Vacantcy' 
            InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField 
            id="standard-basic"
            type="date" 
            value={downDate}
            onChange={(e) => setDownDate(e.target.value)}
            variant="standard" 
            label='Posting Down' 
            InputLabelProps={{
                shrink: true,
              }}
            />
            </span>
            <Row>

            <TextField 
            id="standard-basic" 
            label="Shift" 
            variant="standard" 
            
            value={shifts[formObj.shift].label }
            InputLabelProps={{
                shrink: true,
              }}
            />
                {buildSegments()}    
                </Row>
                <Button 
                variant="contained"
                
                disabled={disabled}
                >Post</Button>
            </Form>
        </BackDrop>
        :''
    );
}

export default PopUpForm;

const BackDrop = styled.div`
    height: 100vh;
    width: 100vw;
    z-index: 100;
    position: fixed;
    top: 0;
    background-color: rgb(9, 0, 12, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    
    
`
    const Form = styled.form`
    color: #228B22;
    background-color: white;
    display: flex;
    align-items: space-around;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-direction: column;
    width: 25%;
    margin-top: 2%;
    padding: 2%;
    border-radius: 50px;
    button {
        background-color: green; 
        color: white;
    }
    button:disabled {
        background-color: light grey;
    }

`
const Close = styled.div`
    width: 100%;
    text-align: right;
    cursor: pointer;
`
const Row = styled.div`

`