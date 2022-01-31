import { TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useScheValue } from '../context/ScheContext';
import Cell from './Cell'

function Row({load, i, wk}) {

  const [obj, setObj] = useState()
  const [{ cols}, dispatch] = useScheValue()
  

  useEffect(() => {
    
    // console.log("load")
    setObj(load.data[wk])

  })

  const buildCells = () => {
    let keys = Object.keys(obj)
    return(
      keys.length > 0 &&
      keys.map(day => (
        <Cell 
        // key={load.job + column.id} 
        align="center"
        style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
        // click={click} //returns cell info
        value={obj[day][i]}
        />
      ))
    )
  }

  // const findEE = () => {
  //   setWkNum(findWeek(load.ee))
  //   console.log(load.ee[wk])
  //   let ee = load.ee[wk]
  //   console.log(wk)
  //   return ee
  // }

  const findCell = (pos, day) => {
      let column = undefined
      let row = undefined
      
      cols.map((col) => {
        if (col.id === day) {
  
          // returns index of cell as a number
          column = cols.indexOf(cols[cols.indexOf(col)])
          console.log(column)
          return column
  
          // console.log(columns.indexOf(columns[columns.indexOf(col)]))
        } 
        // console.log(typeof pos)
        if (load === pos) {
          // returns index of cell as a number
          // row = load.indexOf(load[load.indexOf(pos)])
          
          return row
          
          // console.log(columns.indexOf(columns[columns.indexOf(col)]))
        } 
        
      })
      return {row, column}
    }
  
    const handleClick = (pos, day) => {
      console.log(pos)
      let cell = findCell(pos, day)
      let ee = load[cell.row]
      // value of ee at cell
      // console.log(ee)
      
      load.length > 0 &&
      load.map((row) => {
  
        if (load.indexOf(row) === cell.row) {
          // setLoad(...load, load[cell.row]: newCell)
        }
      })
  
      
      // console.log(cell)
    }

    
      
    return (
      <TableRow tabIndex={-1} >                      
        
              <Cell 
                // key={load.job + column.id} 
                align="left"
                style={{ fontSize: 15, padding: 2, cursor: "default"}}
                // click={click} //returns cell info
                value={load.label}
                />
                {
                  obj &&
                  buildCells()
                }
                
      </TableRow>
  );
}

export default Row;
