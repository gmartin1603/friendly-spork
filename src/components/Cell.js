import { TableCell } from '@material-ui/core';
import React from 'react';

function Cell(props) {
    return (
        <TableCell 
            key={props.key} 
            align={props.align}
            style={props.style}
            onClick={props.click} //returns cell info
            >
            {
            props.value
            }
        </TableCell>
    );
}

export default Cell;