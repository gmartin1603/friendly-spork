import { TableBody } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useScheValue } from '../context/ScheContext';
import Row from './Row';

function Department({key, show, shift, i}) {
    const [state, dispatch] = useScheValue()

    useEffect(() => {
        console.log("load")
    })
    
    return (
        <TableBody>
            {
                
                
                state[key] &&
                state[key].map(row => {
                    if (row[shift]) {
                    return (
                        <Row
                        load={row}
                        i={i}
                        />
                    )  
                    }
                })
                
            }
        </TableBody>   

    );
}

export default Department;

