import React, { useEffect, useState } from "react"
import useWindowSize from "../helpers/windowSize";
import TopRow from "./TopRow"
import { useAuthState } from "../context/auth/AuthProvider";
import { button } from "../context/style/style";

const ArchBody = ({shift, rows, cols}) => {
    const [activeMisc, setActiveMisc] = useState([])

    const [width, height] = useWindowSize([0,0]);
    const [{ rota, posts, profile, view }, dispatch] = useAuthState()

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
        {rows.map(row => {
            if (row.group === "misc") {
                if (!activeMisc.includes(row.id)) {
                    setActiveMisc((prev) => ([...prev, row.id]))
                }
            }
        return (
            <tr  key={`${row.label} ${shift.id}`}
                className={styles.row}
            >
                <td className="bg-green text-right">
                    {row.label}
                </td>
                <ArchCell
                value={row[1].value}
                post={posts[`${row.id} ${cols[0].label} ${shift.id}`]}
                row={row}
                col={cols[0].label}
                shift={shift}
                />
                <ArchCell
                value={row[2].value}
                post={posts[`${row.id} ${cols[1].label} ${shift.id}`]}
                row={row}
                col={cols[1].label}
                shift={shift}
                />
                <ArchCell
                value={row[3].value}
                post={posts[`${row.id} ${cols[2].label} ${shift.id}`]}
                row={row}
                col={cols[2].label}
                shift={shift}
                />
                <ArchCell
                value={row[4].value}
                post={posts[`${row.id} ${cols[3].label} ${shift.id}`]}
                row={row}
                col={cols[3].label}
                shift={shift}
                />
                <ArchCell
                value={row[5].value}
                post={posts[`${row.id} ${cols[4].label} ${shift.id}`]}
                row={row}
                col={cols[4].label}
                shift={shift}
                />
                <ArchCell
                value={row[6].value}
                post={posts[`${row.id} ${cols[5].label} ${shift.id}`]}
                row={row}
                col={cols[5].label}
                shift={shift}
                />
                <ArchCell
                value={row[7].value}
                post={posts[`${row.id} ${cols[6].label} ${shift.id}`]}
                row={row}
                col={cols[6].label}
                shift={shift}
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

const ArchCell = ({value, post, row, col, shift}) => {

    const [{ rota }, dispatch] = useAuthState()

    const handleClick = () => {
        let obj = {}
        if (!post) {
            console.log("new post")
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
        return dispatch({type: "OPEN-FORM", name: "show"})
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
        cell:`text-center`,
        color: post? {backgroundColor:post.color} : {backgroundColor: row.color},
        miscColor: post? {backgroundColor: row.color} : {backgroundColor: 'black'}
    }

    return (
        <td className={styles.cell} style={row.group === 'misc'? styles.miscColor : styles.color} onClick={() => handleClick()}>
            {post?
                // <input type="text" style={{appearance: 'none', backgroundColor: 'transparent', border: 'none', textAlign: 'center', width: '100%'}}
                // value= {
                //     value
                // }
                // />
                styleValue()
                :
                <p>{value}</p>
            }
        </td>
    )
}
