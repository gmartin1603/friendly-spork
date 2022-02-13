import { TableCell } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useScheValue } from '../context/ScheContext';

function Cell(props) {

    const [state, dispatch] = useScheValue()

    const handleClick = () => {
        
        let formObj = {}
        
        state.cols.filter(col => {
            if (col.tag === props.column){
                return(
                    formObj = {
                        pos: props.ckey,
                        shift: props.shift,
                        date: col.label,
                    }
                )
            }
        })
        dispatch({
            type: 'SET-FORM-STATE',
            load: formObj,
        })
      }

    //   useEffect(() => {
    //       console.log(props.value)
    //   })

    return (
        <TableCell 
            key={props.ckey} 
            align={props.align}
            style={props.style}
            onClick={() => handleClick()} //returns cell info
            >
            {
            props.value
            }
        </TableCell>
    );
}

export default Cell;