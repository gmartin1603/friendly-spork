import { TableRow } from '@material-ui/core';
import { DomainPropTypes } from '@material-ui/pickers/constants/prop-types';
import React, { useEffect, useState } from 'react';
import { useScheValue } from '../context/ScheContext';
import Cell from './Cell'

function Row({load, i, wk, key, crush, posts}) {

  const [obj, setObj] = useState({})
  const [week, setWeek] = useState({})
  const [{ casc, csst, cols}, dispatch] = useScheValue()
  

  useEffect(() => {
    
    console.log("Load")
    crush ?
      setWeek({
        2:casc.rota[load.data.mon[i][wk]],
        3:casc.rota[load.data.tue[i][wk]],
        4:casc.rota[load.data.wed[i][wk]],
        5:casc.rota[load.data.thu[i][wk]],
        6:casc.rota[load.data.fri[i][wk]],
        7:casc.rota[load.data.sat[i][wk]],
        8:casc.rota[load.data.sun[i][wk]],
      })
      :
      setWeek({
        2:csst.rota[load.data.mon[i][wk]],
        3:csst.rota[load.data.tue[i][wk]],
        4:csst.rota[load.data.wed[i][wk]],
        5:csst.rota[load.data.thu[i][wk]],
        6:csst.rota[load.data.fri[i][wk]],
        7:csst.rota[load.data.sat[i][wk]],
        8:csst.rota[load.data.sun[i][wk]],
      })
      posts &&
      posts.map(post => {
        if (post.shift === i) {
          cols.forEach((col) => {
            console.log(col.label + ' => ' + post.date)

            if (col.label === post.date) {
              console.log(col.id)
            }
          })
        }
      })
  },[crush,wk])

  useEffect(() => {
    console.log(week)
    console.log(posts)
    
    // posts &&
    // posts.map(post => {
    //   if (post.shift === i) {
    //     cols.forEach(col => {
    //       console.log(col.label + ' => ' + post.date)

    //       if (col.label === post.date) {
    //         console.log(post)
    //         setWeek({
    //           ...week,
    //           [col.id]: post.ee,
    //         })
    //       }
    //     })
    //   }
    // })
    
  })
  

  const buildCells = () => {
    
      
    return (
      week &&
      Object.keys(week).map(day => {
        
        return (
        <Cell 
        ckey={load.label}
        row={key}
        shift={i}
        wk={wk}
        column={day} 
        align="center"
        style={{ fontSize: 15, cursor: "pointer"}}
        // click={handleClick} //returns cell info
        value={week[day]}
        />)
      })
    )
  }    
    return (
      <TableRow tabIndex={-1} >                      
        
              <Cell 
                // key={load.job + column.id} 
                align="left"
                style={{ fontSize: 15, cursor: "default"}}
                value={load.label}
                />
              {/* <Cell 
                ckey={load.label}
                row={key}
                shift={i}
                wk={wk}
                column={2} 
                align="center"
                style={{ fontSize: 15, cursor: "pointer"}}
                // click={handleClick} //returns cell info
                value={week[2]}
                /> */}
                {buildCells()}
      </TableRow>
  );
}

export default Row;
