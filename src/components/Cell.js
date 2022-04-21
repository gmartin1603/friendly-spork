import { TableCell } from '@material-ui/core';
import React, { useLayoutEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function Cell(props) {

    const {toggleForm} = useAuthState()
    const [color, setColor] = useState(props.postColor)

    useLayoutEffect(() => {
        if (props.post?.color) {
            setColor(props.post.color)
        } else {
            setColor(props.postColor)
        }
    },[props.post])

    const handleClick = (e) => {
        
        console.log(props.post)
        let obj = {}

        if (!props.first) {

            if (props.post) {
    
                const post = props.post
                if (post.tag) {
                    
                    obj = {
                        type:"single",
                        modify: true,
                        id: post.id,
                        dept: props.dept,
                        pos: props.pos,
                        shift: props.shift,
                        date: props.column.label,
                        seg: post.seg,
                        norm: props.value,
                        color: post.color,
                        tag: post.tag
                    }
                    toggleForm(obj)
                } else {
                    obj = {
                        type:"single",
                        modify: true,
                        id: props.id,
                        dept: props.dept,
                        pos: props.pos,
                        shift: props.shift,
                        date: props.column.label,
                        seg: post.seg,
                        norm: props.value,
                        color: post.color
                    }
        
                    toggleForm(obj)

                }
    
            } else {
                obj = {
                    type:"single",
                    id: props.id,
                    dept: props.dept,
                    pos: props.pos,
                    shift: props.shift,
                    date: props.column.label,
                    norm: props.value,
                    color: props.postColor,
                }
    
                toggleForm(obj)
            }
        //if clicked cell is the first in row      
        } else {
            if (!props.disabled) {
                obj = {
                    type: "week",
                    dept: props.dept,
                    pos: props.pos,
                    shift: props.shift,
                    cols: props.column,
                    color: props.postColor,
                }
    
                toggleForm(obj)

            }
        }

    }

    const formatValue = () => {
        
        // console.log(post)
        const post = props.post
        
        if(post.seg.two?.name?.length > 0) {
        if (post.seg.three?.name?.length > 0) {
            return [post.seg.one, post.seg.two, post.seg.three]
        } else {
            return [post.seg.one, post.seg.two]
        }
        } else {
        return [post.seg.one]
        }
        
    }

    const styleValue = () => {
        return (
            <div
            id={props.id} 
            className={` flex justify-center z-10 w-full`}
            style={{backgroundColor: color}}
            >
                {
                    formatValue().map((seg, i) => {
                        // console.log(props.value)
                        let text = {}
                        if (seg.trade) {
                            text.color = '#0EE100'
                            text.weight = 'semibold'
                        } else if (seg.forced) {
                            text.color = 'red'
                            text.weight = 'bold'
                        }
                            return (
                                <span key={i} className={`flex justify-center`}>
                                    <p 
                                    className={`font-${text.weight}`}
                                    style={{color: text.color}}
                                    >
                                        {seg.name}
                                    </p> 
                                    {
                                        formatValue()[i+1] && '/'
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
            style={props.disabled? {backgroundColor:color, cursor:"default"}:{backgroundColor:color, cursor: 'pointer'}}
            onClick={(e) => handleClick(e)} //returns cell info
            >
            {
                props.post?
                styleValue()
                :
                props.value
            }
        </td>
    );
}

export default Cell;