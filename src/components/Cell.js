import React, { useLayoutEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function Cell(props) {

    const [color, setColor] = useState(props.postColor)

    const [state, dispatch] = useAuthState()

    useLayoutEffect(() => {
        if (props.post?.color) {
            setColor(props.post.color)
        } else {
            setColor(props.postColor)
        }
    },[props.post])

    const handleClick = (e) => {
        
        console.log(props.post)
        let flag = ""
        let obj = {}

        if (!props.first) {
            flag = "show"
            if (props.post) {
                const post = props.post
                if (post.tag) {
                    obj = {
                        type:"single",
                        modify: true,
                        filled: post.filled,
                        lastMod: post.lastMod,
                        id: post.id,
                        dept: props.dept,
                        pos: props.pos,
                        shift: props.shift,
                        date: props.column.label,
                        down: post.down,
                        creator: post.creator,
                        seg: post.seg,
                        norm: props.value,
                        color: post.color,
                        tag: post.tag
                    }
                    dispatch(
                        {
                            type: "SET-OBJ",
                            name: "formObj",
                            load: obj
                        }
                    )
                } else {
                    if (props.value) {
                        obj = {
                            type:"single",
                            modify: true,
                            filled: post.filled,
                            down: post.down,
                            lastMod: post.lastMod,
                            id: props.id,
                            dept: props.dept,
                            pos: props.pos,
                            shift: props.shift,
                            date: props.column.label,
                            seg: post.seg,
                            norm: props.value,
                            color: post.color
                        }
                    } else {
                        obj = {
                            type:"single",
                            modify: true,
                            down: post.down,
                            filled: post.filled,
                            lastMod: post.lastMod,
                            id: props.id,
                            dept: props.dept,
                            pos: props.pos,
                            shift: props.shift,
                            date: props.column.label,
                            seg: post.seg,
                            color: post.color
                        }
                    }
        
                    dispatch(
                        {
                            type: "SET-OBJ",
                            name: "formObj",
                            load: obj
                        }
                    )

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
    
                dispatch(
                    {
                        type: "SET-OBJ",
                        name: "formObj",
                        load: obj
                    }
                )
            }
        //if clicked cell is the first in row      
        } else {
            flag = "showWeek"
            if (!props.disabled) {
                obj = {
                    type: "week",
                    dept: props.dept,
                    pos: props.pos,
                    shift: props.shift,
                    cols: props.column,
                    color: props.postColor,
                }
    
                dispatch(
                    {
                        type: "SET-OBJ",
                        name: "formObj",
                        load: obj
                    }
                )

            }
        }

        return dispatch({type: "OPEN-FORM", name: flag})

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
        let arr = formatValue()
        return (
            <div
            id={props.id} 
            className={` flex justify-center z-10 w-full`}
            style={{backgroundColor: color}}
            >
                {
                    arr.map((seg, i) => {
                        // console.log(props.value)
                        if (i > 0 && seg.name === arr[i-1].name) {
                            if (props.shift !== 3) {
                                if (arr[i-1].forced === seg.forced) {
                                    if (arr[i-1].trade === seg.trade) {
                                        return
                                    }
                                }
                                
                            }
                        }
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
                                    className={`font-${text.weight} mx-[5px]`}
                                    style={{color: text.color}}
                                    >
                                        {seg.name}
                                    </p> 
                                    { arr[i+1] &&
                                        props.shift === 3 ?
                                        '/'
                                        : 
                                        arr[i+1] &&
                                        arr[i+1].name !== seg.name && 
                                        '/'
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
            className={`border-x`}
            style={props.disabled? {backgroundColor:color, cursor:"default"}:{backgroundColor:color, cursor: 'pointer'}}
            onClick={(e) => {props.disabled? '': handleClick(e)}} //returns cell info
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