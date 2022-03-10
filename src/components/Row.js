import { TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Cell from './Cell'

function Row({posts, load, i, wk, key, cols, rota, screen, color, day }) {

  const [week, setWeek] = useState({})
  const [show, setShow] = useState(false)
  

  useEffect(() => {
    
    // console.log(rota)
    rota &&
    setWeek({
      1: rota[load.data?.mon[i][wk]],
      2: rota[load.data?.tue[i][wk]],
      3: rota[load.data?.wed[i][wk]],
      4: rota[load.data?.thu[i][wk]],
      5: rota[load.data?.fri[i][wk]],
      6: rota[load.data?.sat[i][wk]],
      7: rota[load.data?.sun[i][wk]],
    })
    
  },[wk])

  const formatValue = (ref) => {
    let post = posts[ref].seg
    // console.log(post)
    
    if (post) {
      if(post.two.name.length > 0) {
        if (post.three.name.length > 0) {
          return [{name: post.one.name, forced: post.one.forced}, {name:post.two.name, forced: post.two.forced}, {name: post.three.name, forced: post.three.forced}]
        } else {
          return [{name: post.one.name, forced: post.one.forced}, {name:post.two.name, forced: post.two.forced}]
        }
      } else {
        return [{name: post.one.name, forced: post.one.forced}]
      }
    } 
  }

  const buildCells = () => {  
    return (
      week &&
      Object.keys(week).map(d => {
        const postRef = `${load.id} ${cols[d-1]?.label} ${i}`
        return (
        <Cell 
        id={ postRef }
        postColor={posts[postRef]?.color}
        dept={rota.dept}
        pos={load.id}
        posLabel={load.label}
        shift={i + 1}
        column={cols[d-1]} 
        align="center"
        style={{padding: '0 5px', fontSize: '100%', cursor: "pointer", backgroundColor: posts[postRef]? posts[postRef].color : color, borderColor: 'black'}}
        value={posts && posts[postRef]? formatValue(postRef) : week[d]}
        />)
      })
    )
  } 
    
    return screen < 500 ? (
      <tr >                      
        
              <Cell 
                // key={load.job + column.id}
                scope='row' 
                align="left"
                style={{ fontSize: 15, cursor: "default", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                />
              <Cell 
                // key={`${load.id} ${cols[day]?.label} ${i}`}
                id={ `${load.id} ${cols[day]?.label} ${i}` }
                postColor={posts[`${load.id} ${cols[day]?.label} ${i}`]?.color}
                dept={rota.dept}
                pos={load.pos}
                posLabel={load.label}
                shift={i + 1}
                column={cols[day]} 
                align="center"
                style={{ fontSize: 15, cursor: "pointer", backgroundColor: posts[`${load.id} ${cols[day]?.label} ${i}`]? '' : color, borderColor: 'black'}}
                value={ posts && posts[`${load.id} ${cols[day]?.label} ${i}`]? formatValue(`${load.id} ${cols[day]?.label} ${i}`) : week[day + 1]}
                />
              
      </tr>
    )
    :
    (
      <tr >                      
        
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
