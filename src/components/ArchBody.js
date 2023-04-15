import React from "react"
import useWindowSize from "../helpers/windowSize";
import TopRow from "./TopRow"

const ArchBody = ({shift, rows, cols}) => {

    const [width, height] = useWindowSize([0,0]);

    const buildRows = () => {
        let arr = []
        rows.map((row,i) => {
            let obj ={}
            obj.color = shift.color[row.load.group][0]
            // color selection
            const prevRow = arr[arr.length - 1]
            if (prevRow) {
                if (row.load.group !== prevRow.load.group) {
                    obj.color = shift.color[row.load.group][0]
                } else {
                    if (prevRow.color === shift.color[row.load.group][0]) {
                        obj.color = shift.color[row.load.group][1]
                    } else {
                        obj.color = shift.color[row.load.group][0]
                    }
                }
            }

            // console.log(row.load.data[1])
            obj.key = row.key
            obj.load = row.load
            obj.posts = row.posts
            arr.push(obj)
        })
        return arr
    }

    const styles = {
        main:``,
        row:``,
        cell:`text-center`
    }

  return (
    <tbody>
        <TopRow
        shift={shift}
        screen={width}
        cols={cols}
        />
        {buildRows().map(row => (
            <tr  key={row.key}
                className={styles.row}
                style={{backgroundColor: row.color}}
            >
                <td className="bg-green text-right">
                    {row.load.label}
                </td>
                <ArchCell row={row} post={row.posts[cols[0].label]} col={1}/>
                <ArchCell row={row} post={row.posts[cols[1].label]} col={2}/>
                <ArchCell row={row} post={row.posts[cols[2].label]} col={3}/>
                <ArchCell row={row} post={row.posts[cols[3].label]} col={4}/>
                <ArchCell row={row} post={row.posts[cols[4].label]} col={5}/>
                <ArchCell row={row} post={row.posts[cols[5].label]} col={6}/>
                <ArchCell row={row} post={row.posts[cols[6].label]} col={7}/>
            </tr>
        ))}
    </tbody>
  )
}

export default ArchBody

const ArchCell = ({row, post, col}) => {

    const formatValue = () => {
        // console.log(post)
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
        color: post? {backgroundColor:post.color} : row.load.group === 'misc'? {backgroundColor: "black"} : {}
    }

    return (
        <td className={styles.cell} style={styles.color}>
            {
                post?
                styleValue()
                :
                row.load.data?
                row.load.data[col]
                :
                    null
            }
        </td>
    )
}
