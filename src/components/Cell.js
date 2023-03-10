import React, { useLayoutEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';

function Cell(props) {

    const [color, setColor] = useState(props.postColor)

    const [{profile, scale}, dispatch] = useAuthState()

    useLayoutEffect(() => {
        if (props.post) {
            if (props.post.color) {
                setColor(props.post.color)
            } else {
                setColor(props.postColor)
            }
        } else if (!props.pos.data) {
            setColor("black")
        } else {
            setColor(props.postColor)
        }
    },[props.post])

    const openForm = () => {
        let flag = ""
        let obj = {}
        const post = props.post
            flag = "show"
            switch (parseInt(profile.level)) {
                // admin
                case 0:
                    if (props.post) {
                        if (post.tag) {
                            obj = {
                                type:"single",
                                modify: true,
                                filled: post.filled,
                                lastMod: post.lastMod,
                                id: post.id,
                                dept: props.dept,
                                pos: props.pos,
                                shift: props.shiftObj,
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
                            obj = {
                                type:"single",
                                modify: true,
                                down: post.down,
                                filled: post.filled,
                                lastMod: post.lastMod,
                                id: props.id,
                                dept: props.dept,
                                pos: props.pos,
                                shift: props.shiftObj,
                                date: props.column.label,
                                seg: post.seg,
                                slots: post.slots,
                                color: post.color
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
                            shift: props.shiftObj,
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
                    break
                // supervisor
                case 1:
                    if (props.post) {
                        if (post.tag) {
                            obj = {
                                type:"single",
                                modify: true,
                                filled: post.filled,
                                lastMod: post.lastMod,
                                id: post.id,
                                dept: props.dept,
                                pos: props.pos,
                                shift: props.shiftObj,
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
                            obj = {
                                type:"single",
                                modify: true,
                                down: post.down,
                                filled: post.filled,
                                lastMod: post.lastMod,
                                id: props.id,
                                dept: props.dept,
                                pos: props.pos,
                                shift: props.shiftObj,
                                date: props.column.label,
                                seg: post.seg,
                                slots: post.slots,
                                color: post.color
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
                            shift: props.shiftObj,
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
                    break
                // control room display
                // 4 = off, 3 = on
                case 4:
                    // const hour = 60 * 60 * 1000
                    const now = new Date()
                    const date = new Date(props.column.label)
                    // today
                    if (now.getDay() === date.getDay()) {
                        // clicked before 3pm
                        if (now.getHours() < 15) {
                            flag = "showCallin"
                            console.log("Callin")
                        // clicked after 3pm and cell is after 1st shift
                        } else if (now.getHours() >= 15 && props.shift > 0) {
                            flag = "showCallin"
                            console.log("Callin")
                        } else return
                    // tomorrow
                    } else if (now.getTime() < date.getTime()) {
                        if (now.getDay !== date.getDay()) {
                            if (now.getTime() + (24*60*60*1000) > date.getTime()) {
                                flag = "showCallin"
                                console.log("Callin")
                            } else return
                        } else return
                    // yesturday
                    } else if (now.getDay() === date.getDay() + 1) {
                        // it's before 7am and the cell is after 2nd shift
                        if (now.getHours() < 7 && props.shift > 1) {
                            flag = "showCallin"
                            console.log("Callin")
                        } else return
                    }
                        else return
                    obj = {
                        type:"single",
                        id: props.id,
                        dept: props.dept,
                        pos: props.pos,
                        shift: props.shiftObj,
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
                    break
                // ee users
                case 3:
                    if (props.post) {
                        if (post.down > new Date().getTime()) {
                            if (profile.quals.includes(post.pos)) {
                                flag= "showBid"
                                obj = {
                                    title:`${props.pos.label} ${props.shiftObj.label}`,
                                    post: post,
                                    shift: props.shiftObj,
                                }
                                dispatch(
                                    {
                                        type: "SET-OBJ",
                                        name: "formObj",
                                        load: obj
                                    }
                                )
                            } else {
                                console.log("Not Qualified")
                                return
                            }
                        } else {
                            console.log("Post Down")
                            return
                        }
                    } else return
                    break
                default :
                console.log("Switch default")
                return
            }


        return dispatch({type: "OPEN-FORM", name: flag})
    }

    const formatValue = () => {
        // console.log(post)
        // const post = testPost
        const post = props.post
        let keys = Object.keys(post.seg)
        const segs = post.seg
        let cells = []
        let cell = {one:{}, two:{}}
        if (segs.three) {
            cell = {one: {}, two: {}, three: {}}
        }
        cells.push(cell)
        keys.map((key, index) => {
            if (segs[key].segs) {
                for (const i in segs[key].segs) {
                    if (cells.length !== segs[key].segs.length) {
                        cells.push(cell)
                    }
                    // console.log(segs[key].segs)
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
        // console.log(arr)
        return (
            arr.map((cell,index) => {
            let keys = Object.keys(cell)
            return (
            <div className={`flex justify-center`}
            key={index}
            >
                {

                    keys.map((key,i) => {
                        // console.log(keys[i-1])
                        // console.log(cell)
                        let prev = {}
                        if (i !== 0) {
                            prev = cell[keys[i-1]]
                            // console.log(prev)
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
            className={`hover:text-[gray] hover:font-bold ${props.hoverTog? "font-extrabold":""}`}
            style={props.disabled? {backgroundColor: color, cursor:"default"}:{backgroundColor: color, cursor: 'pointer'}}
            onClick={() => props.hoverTog ? openForm() : dispatch({type:"ARR-PUSH", load:props.id, name:"scale"})} //returns cell info
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