import { TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cell from './Cell'

function Row({load, i, wk, key, cols, rota, screen, color, day }) {

  const [week, setWeek] = useState({})
  

  useEffect(() => {
    
    // console.log(rota)
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
  },[wk])

  const formatValue = (obj) => {
    let one = `${rota.posts[postRef].seg.one}`
    let two = `${rota.posts[postRef].seg.two}`
    let three = `${rota.posts[postRef].seg.three}`
    if (obj.three) {
      return one + '/' + two + '/' + three
    } else if (obj.two) {
      return one + '/' + two
    } else return one
  }

  const buildCells = () => {  
    return (
      week &&
      Object.keys(week).map(day => {
        const postRef = `${load.id} ${cols[day-1]?.label} ${i}`
        return (
        <Cell 
        id={ postRef }
        dept={rota.dept}
        pos={load.pos}
        posLabel={load.label}
        shift={i + 1}
        column={cols[day-1]} 
        align="center"
        style={{ fontSize: 15, cursor: "pointer", backgroundColor: color, borderColor: 'black'}}
        value={rota?.posts && rota.posts[postRef]? `${rota.posts[postRef].seg.one}/${rota.posts[postRef].seg.two || ''}${rota.posts[postRef].seg.three || ''}` : week[day]}
        />)
      })
    )
  } 
     
    return screen < 500 ? (
      <tr tabIndex={-1} >                      
        
              <Cell 
                // key={load.job + column.id}
                scope='row' 
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
                scope='row'
                align="left"
                style={{ fontSize: 15, cursor: "default", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                />
              
                {buildCells()}
      </tr>
    )
}

export default Row;
