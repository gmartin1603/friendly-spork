import { Checkbox } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components'

function Days({setWeek, count}) {
    
    const obj = [
        {count: count},
        {dow: "Mon", checked: true}, 
        {dow: "Tue", checked: true}, 
        {dow: "Wed", checked: true},
        {dow: "Thu", checked: true},
        {dow: "Fri", checked: true},
        {dow: "Sat", checked: false},
        {dow: "Sun", checked: false},
    ]

    const handleChange = (e) => {
        obj.map((day) => {
            if (day.dow === e.target.name) {
                day.checked = e.target.checked
                setWeek(obj)
            }
        })
        // console.log(obj)
    }


    return (
        <Container>
            {
                obj.map((day) => {
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