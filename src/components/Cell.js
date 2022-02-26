import { TableCell } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function Cell(props) {

    const {toggleForm} = useAuthState()
    const [obj, setObj] = useState()

    const handleClick = (e) => {
        console.log(props.column)    
        
        toggleForm({
            id: e.target.id,
            pos: props.pos,
            shift: props.shift,
            date: props.column.label
        })
    }

    //   useEffect(() => {
    //       console.log(props.value)
    //   })

    return (
        <td 
            id={props.id}
            align={props.align}
            style={props.style}
            onClick={(e) => handleClick(e)} //returns cell info
            >
            {
            props.value
            }
        </td>
    );
}

export default Cell;