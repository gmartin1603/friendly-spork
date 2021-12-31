import { TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useScheValue } from '../context/ScheContext';
import Cell from './Cell'

function Row({load, i}) {

  const [wkNum, setWkNum] = useState(1)
  const [obj, setObj] = useState()
  const [state, dispatch] = useScheValue()
  

  

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
      
      state.cols.map((col) => {
        if (col.id === day) {
  
          // returns index of cell as a number
          column = state.cols.indexOf(state.cols[state.cols.indexOf(col)])
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
              <Cell 
                // key={load.job + column.id} 
                align="center"
                style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
                // click={click} //returns cell info
                value={load.data[wkNum].mon[i]}
                />
              <Cell 
                // key={load.job + column.id} 
                align="center"
                style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
                // click={click} //returns cell info
                value={load.data[wkNum].tue[i]}
                />
              <Cell 
                // key={load.job + column.id} 
                align="center"
                style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
                // click={click} //returns cell info
                value={load.data[wkNum].wed[i]}
                />
              <Cell 
                // key={load.job + column.id} 
                align="center"
                style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
                // click={click} //returns cell info
                value={load.data[wkNum].thu[i]}
                />
              <Cell 
                // key={load.job + column.id} 
                align="center"
                style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
                // click={click} //returns cell info
                value={load.data[wkNum].fri[i]}
                />
              <Cell 
                // key={load.job + column.id} 
                align="center"
                style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
                // click={click} //returns cell info
                value={load.data[wkNum].sat[i]}
                />
              <Cell 
                // key={load.job + column.id} 
                align="center"
                style={{ fontSize: 15, padding: 2, cursor: "pointer"}}
                // click={click} //returns cell info
                value={load.data[wkNum].sun[i]}
                />
            
      </TableRow>
  );
}

export default Row;
