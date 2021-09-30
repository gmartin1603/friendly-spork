import { Checkbox } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useEeValue } from '../context/EeContext';

function Jobs({category}) {
    const [state, dispatch] = useEeValue()
    // let days = state
    
    const obj = {
        week: "",
        pack: [
            {job: "ETR Pack", checked: false}, 
            {job: "FLR Pack", checked: false}, 
            {job: "FLR BB", checked: false},
            {job: "Warehouse", checked: false},
            {job: "ETR Totes", checked: false},
        ],
        op: [
            {job: "ETR Op ", checked: false}, 
            {job: "FLR Op", checked: false},
        ],
        po: [
            {job: "EXT Op", checked: false}, 
            {job: "Prep Op ", checked: false},
        ],
        util: [
            {job: "Load Out", checked: false}, 
            {job: "Elevator", checked: false},
        ],
        misc: [
            // {job: " ", checked: false}, 
            // {job: " ", checked: false},
        ],
    }

    const handleChange = (e) => {
        console.log(e.target.name)
        obj.map((day) => {
            if (day.job === e.target.name) {
                day.checked = e.target.checked
                // dispatch({
                //     type: "SET-WEEKS",
                //     change: [obj.days],
                //     key: "count"+[obj.week],
                // })
                return state
            }
        })
        // console.log(obj)
    }


    return (
        <Container>
            {
                obj.pack.map((day) => {
                    if ( day.job) {
                        return (
                            <Cell>
                                <h4>{day.job}</h4>
                                <Checkbox name={day.job} onClick={(e) => handleChange(e)} defaultChecked={day.checked} color="success" />
                            </Cell>
    
                        )

                    }
                })
            }

        </Container>
    );
}

export default Jobs;

const Container = styled.div`
    display: flex;
`
const Cell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`