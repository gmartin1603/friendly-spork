import { TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cell from './Cell'

function Row({load, i, wk, key, crush, posts, rota, mobile, color, day }) {

  const [week, setWeek] = useState({})
  

  useEffect(() => {
    
    console.log(rota)
      setWeek({
        1:rota && rota[load.data.mon[i][wk]],
        2:rota && rota[load.data.tue[i][wk]],
        3:rota && rota[load.data.wed[i][wk]],
        4:rota && rota[load.data.thu[i][wk]],
        5:rota && rota[load.data.fri[i][wk]],
        6:rota && rota[load.data.sat[i][wk]],
        7:rota && rota[load.data.sun[i][wk]],
      })
      
      // posts &&
      // posts.map(post => {
      //   if (post.shift === i) {
      //     cols.forEach((col) => {
      //       console.log(col.label + ' => ' + post.date)

      //       if (col.label === post.date) {
      //         console.log(col.id)
      //       }
      //     })
      //   }
      // })
  },[crush,wk])

  // useEffect(() => {
  //   console.log(week)
  //   console.log(posts)
    
  //   // posts &&
  //   // posts.map(post => {
  //   //   if (post.shift === i) {
  //   //     cols.forEach(col => {
  //   //       console.log(col.label + ' => ' + post.date)

  //   //       if (col.label === post.date) {
  //   //         console.log(post)
  //   //         setWeek({
  //   //           ...week,
  //   //           [col.id]: post.ee,
  //   //         })
  //   //       }
  //   //     })
  //   //   }
  //   // })
    
  // })
  

  const buildCells = () => {
    
      
    return (
      week &&
      Object.keys(week).map(day => {
        
        return (
        <Cell 
        key={`${load.label}${day}` }
        pos={load.label}
        row={key}
        shift={i}
        wk={wk}
        column={day} 
        align="center"
        style={{ fontSize: 15, cursor: "pointer", backgroundColor: color, borderColor: 'black'}}
        // click={handleClick} //returns cell info
        value={week[day]}
        />)
      })
    )
  } 
     
    return mobile? (
      <TableRow tabIndex={-1} >                      
        
              <Cell 
                // key={load.job + column.id} 
                align="left"
                style={{ fontSize: 15, cursor: "default", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                />
              <Cell 
                // key={load.job + column.id} 
                align="left"
                style={{ fontSize: 15, cursor: "pointer", backgroundColor: color, borderColor: 'black'}}
                value={week[day]}
                />
              
      </TableRow>
    )
    :
    (
      <TableRow tabIndex={-1} >                      
        
              <Cell 
                // key={load.job + column.id} 
                align="left"
                style={{ fontSize: 15, cursor: "default", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                />
              
                {buildCells()}
      </TableRow>
    )
}

export default Row;
