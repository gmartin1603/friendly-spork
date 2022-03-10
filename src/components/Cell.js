import { TableCell } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function Cell(props) {

    const {toggleForm} = useAuthState()
    const [obj, setObj] = useState()

    const handleClick = (e) => {
        // console.log(e.target)    
        
        toggleForm({
            id: props.id,
            dept: props.dept,
            pos: props.id,
            posLabel: props.posLabel,
            shift: props.shift,
            date: props.column.label,
            current: props.value,
            color: props?.postColor
        })
    }

    useEffect(() => {
        console.log(props.value)
    },[])

    const styleValue = () => {
        return (
            <div
            id={props.id} 
            onClick={(e) => console.log("modified td" + e.target.value)}
            className={` flex justify-center z-10 w-full`}
            style={{backgroundColor: props.postColor}}
            >
                {
                    props.value?.map((seg, i) => {
                        // console.log(props.value[i++])
                            return (
                                <span key={i} className={`flex justify-center`}>
                                    <p className={seg.forced? `text-red font-bold`:'pl-.02'}>{seg.name}</p> 
                                    {
                                        props.value[i+1] && '/'
                                    }
                                    
                                </span>
                            )
                    })
                }

            </div>
        )
    }

    return (
        
        <td 
            id={props.id}
            align={props.align}
            style={props.style}
            onClick={(e) => handleClick(e)} //returns cell info
            >
            {
                typeof(props.value) === "object"?
                styleValue()
                :
                props.value
            }
        </td>
    );
}

export default Cell;