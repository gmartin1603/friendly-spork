import { Checkbox } from '@material-ui/core';
import React, { useEffect, useState, } from 'react';
import styled from 'styled-components'
import {usePosValue} from '../context/PosContext'

function Days({ count, shift }) {

    const [state, dispatch] = usePosValue()
    const [week, setWeek] = useState(
        {mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false }
        )
    
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

    useEffect(() => {
        dispatch({
            type: "SET-WEEKS",
            key: "shift" + count,
            change: week
        }) 
    },[ ,week])

    const handleChange = (e) => { 
        let day = e.target.name
        let key = week[day.toLowerCase()]
        let change = Object.keys(week)
        

        change.map((d, i) => {
            if (change[i] === day.toLowerCase()){
                setWeek({...week, [day.toLowerCase()]: !key})
                // console.log(week)
            }
            // else console.log(day)
        })
    }


    return (
        <Container>
            {
                obj.days.map((day) => {
                    if ( day.dow) {
                        return (
                            <Cell>
                                <h4>{day.dow}</h4>
                                <Checkbox 
                                    name={day.dow} 
                                    onClick={(e) => handleChange(e)} 
                                    defaultChecked={day.checked} 
                                    color="success" 
                                />
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