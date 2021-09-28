import { Checkbox } from '@material-ui/core';
import React, { useEffect, useReducer, } from 'react';
import styled from 'styled-components'
import {useFormValue} from '../context/FormContext'

function Days({setWeek, count}) {

    const [state, dispatch] = useFormValue()
    const key = "count"+count
    let days = state
    
    const obj = {
        week: count,
        days: [
            {dow: "Mon", checked: true}, 
            {dow: "Tue", checked: true}, 
            {dow: "Wed", checked: true},
            {dow: "Thu", checked: true},
            {dow: "Fri", checked: true},
            {dow: "Sat", checked: false},
            {dow: "Sun", checked: false}
        ]
    }
    // const obj = 
    //     {week: count,
    //     dow: "Mon", checked: true, 
    //     dow: "Tue", checked: true, 
    //     dow: "Wed", checked: true,
    //     dow: "Thu", checked: true,
    //     dow: "Fri", checked: true,
    //     dow: "Sat", checked: false,
    //     dow: "Sun", checked: false}
    

    useEffect(() => {
        console.log(days)
        // reducer("SET", obj)
        // dispatch({
        //     type: "SET",
        //     load: "CHANGED"
        // }, state)
    }, [days])

    const handleChange = (e) => {
        obj.days.map((day) => {
            if (day.dow === e.target.name) {
                day.checked = e.target.checked
                dispatch({
                    type: "SET",
                    change: [obj.days],
                    key: "count"+[obj.week],
                })
            }
        })
        // console.log(obj)
    }


    return (
        <Container>
            {
                obj.days.map((day) => {
                    if ( day.dow) {
                        return (
                            <Cell>
                                <h4>{day.dow}</h4>
                                <Checkbox name={day.dow} onClick={(e) => handleChange(e)} defaultChecked={day.checked} color="success" />
                            </Cell>
    
                        )

                    }
                })
            }

        </Container>
    );
}

export default Days;

const Container = styled.div`
    display: flex;
`
const Cell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`