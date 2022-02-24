import { TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cell from './Cell'

function Row({load, i, wk, key, crush, posts, rota, screen, color, day }) {

  const [week, setWeek] = useState({})
  

  useEffect(() => {
    
    console.log(rota)
    rota &&
    setWeek({
      1: rota[load.data.mon[i][wk]],
      2: rota[load.data.tue[i][wk]],
      3: rota[load.data.wed[i][wk]],
      4: rota[load.data.thu[i][wk]],
      5: rota[load.data.fri[i][wk]],
      6: rota[load.data.sat[i][wk]],
      7: rota[load.data.sun[i][wk]],
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
     
    return screen < 500 ? (
      <tr tabIndex={-1} >                      
        
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
                value={week[day + 1]}
                />
              
      </tr>
    )
    :
    (
      <tr tabIndex={-1} >                      
        
              <Cell 
                // key={load.job + column.id} 
                align="left"
                style={{ fontSize: 15, cursor: "default", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                />
              
                {buildCells()}
      </tr>
    )
}

export default Row;
