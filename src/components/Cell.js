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

    const testPost = {
        filled: true,
        seg: {
            one: {
                segs:[
                    {name: "Foo", forced: false, trade:false},
                    {name: "Ben", forced: false, trade:true},
                    {name: "Bill", forced: true, trade:false},
                ],
                bids:[]
            },
            two: {
                segs:[
                    {name: "Matt", forced: false, trade:true},
                    {name: "Ben", forced: true, trade:false},
                    {name: "Bill", forced: true, trade:false},
                ],
                bids:[]
            },
        }
    }

    const formatValue = () => {
        // console.log(post)
        // const post = testPost
        const post = props.post
        let keys = Object.keys(post.seg)
        const segs = post.seg
        let cells = []
        let cell = {}
        keys.map(key => {
            if (segs[key].segs) {
                for (const i in segs[key].segs) {
                    cells[i] = {...cells[i], [key]: segs[key].segs[i]}
                }
            } else {
                cells[0] = {...cells[0], [key]: segs[key]}
            }
        })
        // console.log(cells)
        return cells
    }

    const styleValue = () => {
        let arr = formatValue()
        console.log(arr)
        return (
            arr.map((cell,index) => {
            let keys = Object.keys(cell)
            return (
            <div className={`flex justify-center`}
            key={index}
            >
                {
                    
                    keys.map((key,i) => {
                        console.log(keys[i-1])
                        // console.log(cell)
                        let prev = {}
                        if (i !== 0) {
                            prev = cell[keys[i-1]]
                            console.log(prev)
                            if (cell[key].name === prev.name) {
                                if (props.shift !== 3) {
                                    if (cell[key].forced === prev.forced) {
                                        if (cell[key].trade === prev.trade) {
                                            return
                                        }
                                    }
                                    // return
                                } else {
                                    if (!props.post.filled) {
                                        return
                                    }
                                }
                            }
                        }
                        let text = {}
                        if (cell[key].trade) {
                            text.color = 'rgb(128, 255, 0)'
                            text.weight = 'semibold'
                        } else if (cell[key].forced) {
                            text.color = 'red'
                            text.weight = 'bold'
                        }
                            return (
                                <div key={`${key}${i}`} className={`flex  justify-center`}>
                                    { i > 0 ?
                                        // night shift check
                                        props.shift === 3 ?
                                        // posts filled check
                                        !props.post.filled?
                                        ''
                                        :
                                        //props.post.filled = true
                                        '/'
                                        : 
                                        //props.shift !== 3
                                        prev.name !== cell[key].name?
                                        '/'
                                        :
                                        prev.forced !== cell[key].forced?
                                        '/'
                                        : 
                                        prev.trade !== cell[key].trade?
                                        '/'
                                        :
                                        ''
                                        :
                                        // i === 0
                                        ''
                                    } 
                                    <p 
                                    className={`font-${text.weight} mx-[5px]`}
                                    style={{color: text.color}}
                                    >
                                        {cell[key].name}
                                    </p> 
                                </div>
                            )
                    })
                }
            </div>
        )}))
    }

    return (
        <td 
            id={props.id}
            align={props.align}
            className={`border-r ${props.first? "sticky left-0 text-clearBlack text-right font-base underline-offset-4 pr-[5px]":''}`}
            style={props.disabled? {backgroundColor: props.first? 'rgb(3, 115, 13)':color, cursor:"default"}:{backgroundColor: props.first? 'rgb(3, 115, 13)':color, cursor: 'pointer'}}
            onClick={(e) => {props.disabled? '': props.first? !props.hoverTog && handleClick(e) : props.hoverTog && handleClick(e)}} //returns cell info
            >
            {
                props.post?
                styleValue()
                :
                props.first &&
                state.profile.level < 2 && 
                props.hoverTog?
                <p className={`text-red mr-[20px] font-bold text-2xl`}>
                    
                        {"X"}
                    
                </p>
                :
                props.value
            }
        </td>
    );
}

export default Cell;