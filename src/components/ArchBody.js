import React, { useEffect, useRef, useState } from "react"
import useWindowSize from "../helpers/windowSize";
import TopRow from "./TopRow"
import { useAuthState } from "../context/auth/AuthProvider";
import { button } from "../context/style/style";

const ArchBody = ({shift, rows, cols}) => {
    const [activeMisc, setActiveMisc] = useState([])
    const [toggle, setToggle] = useState('')

    const [width, height] = useWindowSize([0,0]);
    const [{ rota, posts, profile, view }, dispatch] = useAuthState()

    useEffect(() => {
        // console.log(toggle)
        if (toggle !== '') {
            setTimeout(() => {
                setToggle('')
            }, 3000)
        }
    }, [toggle])

    const openMisc = (e) => {
        e.preventDefault()
        if (width < 1200) return
        if (profile.level > 1) return
        let load = JSON.parse(e.target.dataset.load)
        if (load.group === "misc") return
        let obj = {
            type: "week",
            dept: rota.dept,
            pos: load,
            shift: shift,
            cols: cols,
          }

          dispatch({
            type: "SET-OBJ",
            load: obj,
            name: "formObj"
          })

          return dispatch({type:"OPEN-FORM", name:"showWeek"})
        }

    const addRow = (e) => {
        e.preventDefault()
        const options = view.slice(1).filter(row => row.group === "misc" && !activeMisc.includes(row.id))

        let obj = {
        type: "week",
        dept: rota.dept,
        options: options,
        shift: shift,
        cols: cols,
        }

        if (rows[rows.length - 1].color === shift.color.misc[0]) {
            obj.color = shift.color.misc[1]
        } else {
            obj.color = shift.color.misc[0]
        }

        dispatch({
        type: "SET-OBJ",
        load: obj,
        name: "formObj"
        })

        return dispatch({type:"OPEN-FORM", name:"showWeek"})
    }

    const styles = {
        main:``,
        row:`bg-clearBlack`,
        cell:`text-center`
    }

  return (
    <tbody className={styles.main}>
        <TopRow
        shift={shift}
        screen={width}
        cols={cols}
        />
        {rows.map((row, i) => {
            let next = rows[i + 1]
            let bottomBorder = false
            if (row.group === "misc") {
                if (!activeMisc.includes(row.id)) {
                    setActiveMisc((prev) => ([...prev, row.id]))
                }
            }
            if (i < rows.length - 1 && row.group !== next.group) {
                bottomBorder = true
            }
        return (
            <tr  key={`${row.id} ${shift.id}`}
                style={{borderBottom: bottomBorder ? "2px solid #000" : "none"}}
                className={styles.row}
            >
                <td
                className={`sticky left-0 bg-green text-right ${row.group !== "misc"? "cursor-pointer hover:text-white":''}`}
                data-load={JSON.stringify(row)}
                onClick={(e) => openMisc(e)}>
                    {row.label}
                </td>
                <ArchCell
                id={`${row.id} ${cols[0].label} ${shift.id}`}
                rowKey={1}
                value={row[1]}
                post={posts[`${row.id} ${cols[0].label} ${shift.id}`]}
                row={row}
                col={cols[0].label}
                shift={shift}
                toggle={toggle}
                setToggle={setToggle}
                />
                <ArchCell
                id={`${row.id} ${cols[1].label} ${shift.id}`}
                rowKey={2}
                value={row[2]}
                post={posts[`${row.id} ${cols[1].label} ${shift.id}`]}
                row={row}
                col={cols[1].label}
                shift={shift}
                toggle={toggle}
                setToggle={setToggle}
                />
                <ArchCell
                id={`${row.id} ${cols[2].label} ${shift.id}`}
                rowKey={3}
                value={row[3]}
                post={posts[`${row.id} ${cols[2].label} ${shift.id}`]}
                row={row}
                col={cols[2].label}
                shift={shift}
                toggle={toggle}
                setToggle={setToggle}
                />
                <ArchCell
                id={`${row.id} ${cols[3].label} ${shift.id}`}
                rowKey={4}
                value={row[4]}
                post={posts[`${row.id} ${cols[3].label} ${shift.id}`]}
                row={row}
                col={cols[3].label}
                shift={shift}
                toggle={toggle}
                setToggle={setToggle}
                />
                <ArchCell
                id={`${row.id} ${cols[4].label} ${shift.id}`}
                rowKey={5}
                value={row[5]}
                post={posts[`${row.id} ${cols[4].label} ${shift.id}`]}
                row={row}
                col={cols[4].label}
                shift={shift}
                toggle={toggle}
                setToggle={setToggle}
                />
                <ArchCell
                id={`${row.id} ${cols[5].label} ${shift.id}`}
                rowKey={6}
                value={row[6]}
                post={posts[`${row.id} ${cols[5].label} ${shift.id}`]}
                row={row}
                col={cols[5].label}
                shift={shift}
                toggle={toggle}
                setToggle={setToggle}
                />
                <ArchCell
                id={`${row.id} ${cols[6].label} ${shift.id}`}
                rowKey={7}
                value={row[7]}
                post={posts[`${row.id} ${cols[6].label} ${shift.id}`]}
                row={row}
                col={cols[6].label}
                shift={shift}
                toggle={toggle}
                setToggle={setToggle}
                />
            </tr>
        )})}
        {width > 1200 &&
        profile.level <= 1 &&
        <tr>
            <td className={`flex justify-center `}>
            <button
            className={`${button.green} w-[60%] px-10 my-[5px] border-2 text-xl hover:border-white`}
            onClick={(e) => addRow(e)}
            >
            New Row
            </button>
            </td>
        </tr>}

    </tbody>
  )
}

export default ArchBody

const ArchCell = ({id, rowKey, value, post, row, col, shift, toggle, setToggle}) => {
    const active = useRef(null)

    const [{ rota, profile }, dispatch] = useAuthState()

    const handleClick = () => {
        console.log(id)
        if (toggle !== id) {
            setToggle(id)
            return
        }
        let callIn = false
        let reason = "Call in"
        if (profile.level > 2) {
            setToggle('')
            return
        } else if (profile.level === 2) {
            const now = new Date()
            const date = new Date(col)
            // today
            if (now.getDay() === date.getDay()) {
                if (now.getHours() < shift.end) {
                    // reason = "Leave early"
                    callIn = true
                    console.log("Callin Same Shift")
                } else if (now.getHours() < shift.start) {
                    callIn = true
                    console.log("Callin Later Today")
                } else {
                    setToggle('')
                    return
                }
            // tomorrow
            } else if (now.getTime() < date.getTime()) {
                if (now.getDay !== date.getDay()) {
                    if (now.getTime() + (24*60*60*1000) > date.getTime()) {
                        callIn = true
                        console.log("Callin Tomorrow")
                    } else {
                        setToggle('')
                        return
                    }
                } else {
                    setToggle('')
                    return
                }
            // Out of authorized range
            } else {
                setToggle('')
                return
            }
        }
        let obj = {}
        if (!post) {
            // console.log("new post")
            obj = {
                type:"single",
                id: `${row.id} ${col} ${shift.id}`,
                dept: rota.dept,
                pos: row,
                shift: shift,
                date: col,
                norm: value,
                color: row.color,
            }
            if (callIn) {
                obj["reason"] = reason
                obj["down"] = col
            }
            dispatch(
                {
                    type: "SET-OBJ",
                    name: "formObj",
                    load: obj
                }
            )
        } else {
            console.log(post)
            if (post.tag) {
                obj = {
                    type:"single",
                    modify: true,
                    filled: post.filled,
                    lastMod: post.lastMod,
                    id: post.id,
                    dept: rota.dept,
                    pos: row,
                    shift: shift,
                    date: post.date,
                    down: post.down,
                    creator: post.creator,
                    seg: post.seg,
                    norm: post.norm,
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
                    id: post.id,
                    dept: rota.dept,
                    pos: row,
                    shift: shift,
                    date: post.date,
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

        }
        setToggle('')
        return dispatch({type: "OPEN-FORM", name: "show"})
    }

    const handleChange = (e) => {
        const value = e.target.value

    }

    const formatValue = () => {
        // console.log(value)
        // const post = testPost
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
                { keys.map((key,i) => {
                        // console.log(keys[i-1])
                        // console.log(cell)
                        let prev = {}
                        if (i !== 0) {
                            prev = cell[keys[i-1]]
                            // console.log(prev)
                            if (cell[key].name === prev.name) {
                                if (cell[key].forced === prev.forced) {
                                    if (cell[key].trade === prev.trade) {
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
                                        keys.length > 2 ?
                                        // posts filled check
                                        !post.filled?
                                        ''
                                        :
                                        //post.filled = true
                                        '/'
                                        :
                                        //shift !== 3
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

    const styles = {
        cell:`text-center transition-transform cursor-pointer hover:text-[gray]`,
        click:`scale-110 -translate-y-1 border-2 border-black`,
        close: 'bg-red p-2 rounded-2xl text-base font-bold text-white border-black min-w-max mx-2',
        color: post? post.color? {backgroundColor:post.color} : {backgroundColor: row.color} : {backgroundColor: row.color},
        miscColor: post? {backgroundColor: row.color} : {backgroundColor: 'black'},
        input: {appearance: 'none', backgroundColor: 'transparent', border: 'none', textAlign: 'center', width: '65%'}
    }

    return (
        <td className={`${styles.cell} ${toggle === id? styles.click : ''}`} style={row.group === 'misc'? styles.miscColor : styles.color} onClick={() => handleClick()}>
            <div className="flex justify-between">
                {/* {toggle === id && profile.level < 1?
                    <button className={styles.close} onClick={(e) => {e.preventDefault(); setToggle('')}}>X</button>
                    : ''
                } */}
                <div className="flex-1">
                    {post?
                        styleValue()
                        :
                        // toggle === id && profile.level < 1?
                        // <input type="text" name={id} style={styles.input} ref={active}
                        // onChange={(e) => handleChange(e)}
                        // defaultValue= {value}
                        // />
                        // :
                        value
                    }
                </div>
                {/* {toggle === id && profile.level < 1?
                    <button onClick={(e) => {e.preventDefault(); active.current.focus();}}>ET</button>
                    : ''
                } */}
            </div>
        </td>
    )
}
