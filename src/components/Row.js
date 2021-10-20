import { TableRow } from '@material-ui/core';
import React, { useEffect } from 'react';
import Cell from './Cell'

function Row({load, columns}) {

  // console.log(load)

  const findCell = (pos, day) => {
      let column = undefined
      let row = undefined
      
      columns.map((col) => {
        if (col.id === day) {
  
          // returns index of cell as a number
          column = columns.indexOf(columns[columns.indexOf(col)])
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
      <TableRow tabIndex={-1} key={load.ee}>                      
        {
          columns.map((column) => {
            let value = undefined
            let align = "center"
            let click = undefined
            let cursor = "default"
            let week = Object.keys(load.week)
            // console.log(job)
            
            if (column.id === "position") {
              value =  load.job;
              align = "left"
            }
            else {
                click = () => handleClick(load, column.id)
                cursor = "pointer"
              // console.log(week)
              week.forEach((day) => {
                // console.log(.pos.shift1[day])
                if (column.id === day) {
                  load.week[day]?
                  value = load.ee
                  :
                  value = undefined
                  
                }

              })
              
            }
            
            // console.log(row)
            

            return (
              <Cell 
                key={load.job + column.id} 
                align={align}
                style={{ fontSize: 15, padding: 2, cursor}}
                click={click} //returns cell info
                value={value}
                />
            )
          })
        }
      </TableRow>
  );
}

export default Row;
