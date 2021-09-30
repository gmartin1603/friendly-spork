import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Days from './Days';

function Counter({input}) {
    const [count, setCount] = useState(1)

    const [week, setWeek] = useState([
        {dow: "Mon", checked: true}, 
        {dow: "Tue", checked: true}, 
        {dow: "Wed", checked: true},
        {dow: "Thu", checked: true},
        {dow: "Fri", checked: true},
        {dow: "Sat", checked: false},
        {dow: "Sun", checked: false},
    ])

    useEffect(() => {
        // console.log(week)
    })


    const incr = () => {
        switch (input) {
            case "7":
                if (count < 8) {
                    setCount(count + 1)
                }
            break
            case "5":
                if (count < 3) {
                    setCount(count+1)
                }
            break
            default: {
                return input
            }
        }
    }

    const decr = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const formatTime = (num) => {
        let dayStart = 7
        let dayLength = 24
        let stod = "am"
        let etod = "am"
        let shiftLength = dayLength / count
        let start = dayStart
        let end = dayStart


        if (shiftLength > 12) {
            return (
                // `${start} ${stod} to ${end} ${etod}`
                {start, stod, end, etod}
            )
        }else if (shiftLength === 12) {
            switch (num){
                case 0:
                    etod = "pm"
                break
                case 1:
                    stod = "pm"
                break
                default:

            }
            return (
                // `${start} ${stod} to ${end} ${etod}`
                {start, stod, end, etod}
            )
        } else if (num === 2) {
            start = dayStart + (shiftLength * num)  
            end = dayStart
            
            if (start > 12){
                if (end > 12) {
                    start = start - 12
                    stod = "pm"
                    end = end - 12
                    etod = "pm"
                }else {
                    start = start - 12
                    stod = "pm"
                }
            }else {
                if (end > 12) {
                    end = end - 12
                    etod = "pm"
                }
            }
            return (
                // `${start} ${stod} to ${end} ${etod}`
                {start, stod, end, etod}
            )
        } else {
            start = dayStart + (shiftLength * num)  
            end = start + shiftLength
            
            if (start > 12){
                if (end > 12) {
                    start = start - 12
                    stod = "pm"
                    end = end - 12
                    etod = "pm"
                }else {
                    start = start - 12
                    stod = "pm"
                }
            }else {
                if (end > 12) {
                    end = end - 12
                    etod = "pm"
                }
            }
            return (
                // `${start} ${stod} to ${end} ${etod}`
                {start, stod, end, etod}
            )
        }
    }

    return (
        <Container>
            <Group variant="outlined" aria-label="outlined button group">
                <Button 
                    style={{backgroundColor: '#0B2302', color: '#EEFBE9' }}
                    name="decr"
                    onClick={(e) => decr(e)}
                >
                    -
                </Button>
                <Button 
                    style={{backgroundColor: '#EEFBE9', }}
                    // disabled
                >
                    {count}
                </Button>
                <Button 
                    style={{backgroundColor: '#0B2302', color: '#EEFBE9' }}
                    name="incr"
                    onClick={(e) => incr()}
                    >
                        +
                    </Button>
            </Group>
            {
                (Array.from(Array(count)).map((week, index) => {
                    if (input === "7") {
                        return (
                            <div>
                                <h5>Week {index + 1}</h5>
                                <Days 
                                setWeek={setWeek}
                                count={index+1}
                                />
                            </div>
                        )
                      // input = "5"  
                    } else {
                        let shift = formatTime(index)
                        return (
                            <div>
                                <h5>Shift {index + 1}</h5>
                                <h5>{shift.start} {shift.stod} to {shift.end} {shift.etod}</h5>
                                <Days 
                                shift
                                count={index+1}
                                />
                            </div>
                        )
                    }
                }))
                    
            }
            
        </Container>
    );
}

export default Counter;

const Container = styled.div`
    
`
const Group = styled.div`

`