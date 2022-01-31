import { Checkbox, FormControlLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useEeValue } from '../context/EeContext';
import Days from './Days';

function Jobs({category, hidden, main}) {
    
    const [state, dispatch] = useEeValue()
    

    const handleChange = (e) => {
        console.log(e.target.value)
        
        // console.log(obj)
    }


    return (
        <Container>
            {
                hidden ?
                category.map((pos) =>  {
                    // console.log(hidden)
                    return (
                            <Cell>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                        name={pos} 
                                        onClick={(e) => handleChange(e)} 
                                        defaultChecked={true} 
                                        color="success"
                                        />
                                    }
                                    label={pos}
                                />
                                {
                                    main ?
                                    
                                    <Select
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {
                                            category.map((item, i) => {
                                                let num = i + 1
                                                return (
                                                    <MenuItem value={{[`week${num}`]: pos}}>
                                                        <b>Week {num}</b>
                                                    </MenuItem> 
                                                )
                                            })
                                        }
                                        <MenuItem value="N/A">
                                            <b>N/A</b>
                                        </MenuItem> 
                                    </Select>
                                    : ""
                                }
                                {
                                    main ?
                                    
                                    <Days
                                    count={1}
                                    />
                                    : ""
                                }
                            </Cell>
    
                    )
                })
                : ""
            }

        </Container>
    );
}

export default Jobs;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

`
const Cell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`