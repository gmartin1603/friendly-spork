import React from "react"
import useWindowSize from "../helpers/windowSize";
import TopRow from "./TopRow"

const ArchBody = ({shift, rows, cols}) => {

    const [width, height] = useWindowSize([0,0]);

    const buildRows = () => {
        let arr = []
        rows.map(row => {
            if (row.load.data) {
                // console.log(row.load.data[1])
                arr.push({
                    key: row.key,
                    load: row.load,
                })
            }
        })
        return arr
    }

    const styles = {
        main:``,
    }

  return (
    <tbody>
        <TopRow
        shift={shift}
        screen={width}
        cols={cols}
        />
        {buildRows().map(row => (
            <tr  key={row.key}>
                <td>
                    {row.load.label}
                </td>
                <td>
                    {row.load.data[1]}
                </td>
                <td>
                    {row.load.data[2]}
                </td>
                <td>
                    {row.load.data[3]}
                </td>
                <td>
                    {row.load.data[4]}
                </td>
                <td>
                    {row.load.data[5]}
                </td>
                <td>
                    {row.load.data[6]}
                </td>
                <td>
                    {row.load.data[7]}
                </td>
            </tr>
        ))}
    </tbody>
  )
}

export default ArchBody
