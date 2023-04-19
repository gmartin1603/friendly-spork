import React from "react"
import useWindowSize from "../helpers/windowSize";
import TopRow from "./TopRow"
import { useAuthState } from "../context/auth/AuthProvider";

const ArchBody = ({shift, rows, cols}) => {

    const [width, height] = useWindowSize([0,0]);
    const [{posts, rota}, dispatch] = useAuthState()

    const handleClick = (value, post, name) => {
        let obj = {}
        if (typeof value === 'string' || value instanceof String) {
            console.log("New Post")
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
                    pos: {label: name},
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
                    pos: {label: name},
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

        return dispatch({type: "OPEN-FORM", name: "show"})
        }
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
        return (
            <tr  key={`${row.label} ${shift.id}`}
                className={styles.row}
            >
                <td className="bg-green text-right">
                    {row.label}
                </td>
                <ArchCell name={row.label} value={row[1].value} post={posts[row[1].id]} color={row[1].color} shift={shift} handleClick={handleClick}/>
                {/* <ArchCell value={row[2].value} color={row[2].color} col={2}/>
                <ArchCell value={row[3].value} color={row[3].color} col={3}/>
                <ArchCell value={row[4].value} color={row[4].color} col={4}/>
                <ArchCell value={row[5].value} color={row[5].color} col={5}/>
                <ArchCell value={row[6].value} color={row[6].color} col={6}/>
                <ArchCell value={row[7].value} color={row[7].color} col={7}/> */}
            </tr>
        )})}
    </tbody>
  )
}

export default ArchBody

const ArchCell = ({value, post, color, handleClick, name}) => {
    // console.log(post)
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
        color: {backgroundColor: color}
        // color: post? {backgroundColor:post.color} : row.group === 'misc'? {backgroundColor: "black"} : {}
    }

    return (
        <td className={styles.cell} style={styles.color} onClick={() => handleClick(value, post, name)}>
            {typeof value === 'string' || value instanceof String?
                // <input type="text" style={{appearance: 'none', backgroundColor: 'transparent', border: 'none', textAlign: 'center', width: '100%'}}
                // value= {
                //     value
                // }
                // />
                <p>{value}</p>
                :
                styleValue()
            }
        </td>
    )
}
