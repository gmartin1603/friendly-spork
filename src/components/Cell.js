import { TableCell } from '@material-ui/core';
import React from 'react';

function Cell(props) {

    const handleClick = (key) => {
        console.log(key)
        // let cell = findCell(pos, day)
        // let ee = load[cell.row]
        // // value of ee at cell
        // // console.log(ee)
        
        // load.length > 0 &&
        // load.map((row) => {
    
        //   if (load.indexOf(row) === cell.row) {
        //     // setLoad(...load, load[cell.row]: newCell)
        //   }
        // })
    
        
        // console.log(cell)
      }
    return (
        <TableCell 
            key={props.ckey} 
            align={props.align}
            style={props.style}
            onClick={() => handleClick(props.ckey)} //returns cell info
            >
            {
            props.value
            }
        </TableCell>
    );
}

export default Cell;