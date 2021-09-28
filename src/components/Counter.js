import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Days from './Days';

function Counter(props) {
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
        if (count < 8) {
            setCount(count + 1)
        }
    }

    const decr = () => {
        if (count > 1) {
            setCount(count - 1)
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
                    return (
                        <Days 
                        setWeek={setWeek}
                        count={index+1}
                        />
                    )
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