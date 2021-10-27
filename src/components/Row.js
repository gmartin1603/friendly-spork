import { TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cell from './Cell'

function Row({load, columns, wk}) {
  const today = new Date()
  const [wkNum, setWkNum] = useState(1)
  // console.log(load)

  const findWeek = (obj) => {
    // let w = today
    // console.log(w)
    let arr = Object.keys(obj)
    let result = wk
    // rota = number based on result
    let rota = 1

    for (let i = 0; i < 52; i++) {
      if (rota < arr.length) {
        rota++
      }else {
        rota = 1
      }
      if (i === result) {
        setWkNum(rota)
      }
    }
  }

  // const findEE = () => {
  //   setWkNum(findWeek(load.ee))
  //   console.log(load.ee[wkNum])
  //   let ee = load.ee[wkNum]
  //   console.log(wkNum)
  //   return ee
  // }

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

    useEffect(() => {
      findWeek(load.ee)
    }, [wk])
      
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

                if (column.id === day) {
                  load.week[day] && load.ee[wkNum.toString()]?
                  value = load.ee[wkNum.toString()]
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
