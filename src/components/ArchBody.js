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

    const styles = {
        cell:`text-center`,
        color: post? {backgroundColor:post.color} : {}
    }

    return (
        <td className={styles.cell} style={styles.color}>
            {
                post?
                post.shift
                :
                row.load.data?
                row.load.data[col]
                :
                    null
            }
        </td>
    )
}
