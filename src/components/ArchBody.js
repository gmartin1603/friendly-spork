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

            if (row.load.data) {
                // console.log(row.load.data[1])
                obj.key = row.key
                obj.load = row.load
                arr.push(obj)
            }
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
                <td className={styles.cell}>
                    {row.load.data[1]}
                </td>
                <td className={styles.cell}>
                    {row.load.data[2]}
                </td>
                <td className={styles.cell}>
                    {row.load.data[3]}
                </td>
                <td className={styles.cell}>
                    {row.load.data[4]}
                </td>
                <td className={styles.cell}>
                    {row.load.data[5]}
                </td>
                <td className={styles.cell}>
                    {row.load.data[6]}
                </td>
                <td className={styles.cell}>
                    {row.load.data[7]}
                </td>
            </tr>
        ))}
    </tbody>
  )
}

export default ArchBody
