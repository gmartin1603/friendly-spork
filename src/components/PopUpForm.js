import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../context/auth/AuthProvider';
import { createPost } from '../firebase/firestore';

function PopUpForm({type, show}) {

    const {formObj, toggleForm} = useAuthState({})
    const [downDate, setDownDate] = useState('t')
    const [disabled, setDisabled] = useState(true)
    const [sel, setSel] = useState(false)
    const [one, setOne] = useState('')
    const [two, setTwo] = useState('')
    const [three , setThree] = useState('')

    const shifts = {
        1: {label:'1st Shift', segs: ['7 AM - 3 PM', '7 AM - 11 AM', '11 AM - 3 PM']},
        2: {label:'2nd Shift', segs: ['3 PM - 11 PM','3 PM - 7 PM', '7 PM - 11 PM']},
        3: {label:'3rd Shift', segs: ['11 PM - 7 AM', '11 PM - 3 AM', '3 AM - 7 AM']},
        4: {label:'Night Shift', segs: ['7 PM - 7 AM', '7 PM - 11 PM', '11 PM - 3 AM', '3 AM - 7 AM',]},
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = {}
        if (sel) {
            if(one) {
                temp.one = one
            } else  temp.one = formObj.current
            
            if(two) {
                temp.two = two
            } else  temp.two = formObj.current
            if (formObj.shift === 4) {
                if(three) {
                    temp.three = three
                } else  temp.three = formObj.current
            } else temp.three = ''
            
        } else {
            temp = {
                one: one,
                two: '',
                three: '',
            }

        }
        const post = {
            id: `${formObj.id}`,
            shift: formObj.shift,
            seg: temp,
            pos: formObj.pos,
            date: formObj.date,
            created: new Date(),
        }
        console.log(post)
        createPost(formObj.dept, post).then(() => {
            closeForm()
        })
    }

    useEffect(() => {
        if (downDate !== '') {
        
            setDisabled(false)
            
        }
    },[ downDate])

    const closeForm = () => {
        toggleForm()
        setSel(false)
        setOne('')
        setTwo('')
        setThree('')
        // setDownDate('')
    }

    return (
        show ?
        <BackDrop>
            <Form onSubmit={(e) => handleSubmit(e)} action="posting">
                <Close onClick={() => closeForm()}>
                    <p>Close</p>
                </Close>
                <h1>New Overtime Posting</h1>
            <TextField 
            id="standard-basic" 
            label="Position" 
            variant="standard" 
            value={`${formObj?.posLabel} ${shifts[formObj.shift].label}` }
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
            {/* <TextField 
            id="standard-basic"
            type="date" 
            value={downDate}
            onChange={(e) => setDownDate(e.target.value)}
            variant="standard" 
            label='Posting Down' 
            InputLabelProps={{
                shrink: true,
              }}
            /> */}
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
            <div className={`flex-column m-.05`}>
                <div >
                <label htmlFor="sel"> {sel? 'Shift Segments' : 'Whole Shift'} </label>
                    <input type="checkbox" name="sel" id="sel" onChange={(e) => {setSel(!sel)}}/>
                </div>

                <label htmlFor="one"> {sel ? shifts[formObj.shift].segs[1] : shifts[formObj.shift].segs[0]} </label>
                    <input className={`bg-gray-light`} type="text" value={one} placeholder={formObj.current} name="one" id="one" onChange={(e) => setOne(e.target.value)} />
                {
                    sel &&
                    <div>
                    <label htmlFor="two"> {shifts[formObj.shift].segs[2]} </label>   
                        <input className={`bg-gray-light`} type="text" placeholder={formObj.current} value={two} onChange={(e) => setTwo(e.target.value)} name="two" id="two" />
                    </div>

                }
                {
                    formObj.shift === 4 && sel?
                    <div>
                    <label htmlFor="one"> {shifts[formObj.shift].segs[3]} </label>
                        <input type="text" value={three} onChange={(e) => setThree(e.target.value)} placeholder={formObj.current} name="three" id="three" />   
                    </div>
                    : ''
                }   
            </div>
                </Row>
                <Button 
                variant="contained"
                type='submit'
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