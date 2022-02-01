import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

function PopUpForm({type}) {

    const shifts = {
        first: ['7am to 11am', '11am to 3pm'],
        second: ['3pm to 7pm', '7pm to 11pm'],
        third: ['11pm to 3am', '3am to 7am'],
        night: ['7pm to 11pm', '11pm to 3am', '3am to 7am'],
    }

    return (
        <BackDrop>
                <h1>Scheduled Overtime Posting</h1>
            <Form action="posting">
            <TextField 
            id="standard-basic" 
            label="Position" 
            variant="standard" 
            />
            <TextField 
            id="standard-basic"
            type="date" 
            variant="standard" 
            />
            {
                Object.keys(shifts).map(shift => (

                   <FormControlLabel control={<Checkbox />} label={shift} />
                ))
            }
            
            </Form>
        </BackDrop>
    );
}

export default PopUpForm;

const BackDrop = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 100;
    background-color: rgb(9, 0, 12, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    h1 {
        color: white;
    }
`
const Form = styled.form`
    background-color: white;
    display: flex;
    align-items: space-around;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    width: 20%;
    height: 40%;
    margin-top: 1%;
    padding: 5%;
    border-radius: 50px

`