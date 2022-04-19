import React, { useEffect, useState } from 'react';
import usePostsListener from '../helpers/postsListener';
import Cell from './Cell'

function Row({posts, load, i, wk, cols, rota, screen, color, day, border}) {

  const [week, setWeek] = useState({})
  const [show, setShow] = useState(false)
  

  useEffect(() => {
    const monRef = posts.hasOwnProperty(`${load.id} ${cols[1]?.label} ${i}`)
    const tueRef = posts.hasOwnProperty(`${load.id} ${cols[2]?.label} ${i}`)
    const wedRef = posts.hasOwnProperty(`${load.id} ${cols[3]?.label} ${i}`)
    const thuRef = posts.hasOwnProperty(`${load.id} ${cols[4]?.label} ${i}`)
    const friRef = posts.hasOwnProperty(`${load.id} ${cols[5]?.label} ${i}`)
    const satRef = posts.hasOwnProperty(`${load.id} ${cols[6]?.label} ${i}`)
    const sunRef = posts.hasOwnProperty(`${load.id} ${cols[7]?.label} ${i}`)
    // console.log({mon: monRef, sun: sunRef})
    setWeek({
      1: rota[load.data?.mon[i][wk]],
      2: rota[load.data?.tue[i][wk]],
      3: rota[load.data?.wed[i][wk]],
      4: rota[load.data?.thu[i][wk]],
      5: rota[load.data?.fri[i][wk]],
      6: rota[load.data?.sat[i][wk]],
      7: rota[load.data?.sun[i][wk]],
    })
    if (!load.data) {
      if (monRef || tueRef || wedRef || thuRef || friRef || satRef || sunRef) {
        // console.log({pos:load.id, shift:i, hide: false})
        setShow(true)
      } else {
        // console.log({pos:load.id, shift:i, hide: true})
        setShow(false)
      }
    } else {
      setShow(true)
    }
    
  },[wk, posts, cols])

  const formatValue = (ref) => {
    let post = posts[ref].seg
    // console.log(post)
    
    if (post) {
      if(post.two?.name?.length > 0) {
        if (post.three?.name?.length > 0) {
          return [post.one, post.two, post.three]
        } else {
          return [post.one, post.two]
        }
      } else {
        return [post.one]
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
        key={postRef}
        postColor={posts[postRef]?.color}
        dept={rota.dept}
        pos={load.id}
        posLabel={load.label}
        shift={i}
        column={cols[d-1]} 
        align="center"
        style={{  cursor: "pointer", padding: '0', backgroundColor: posts[postRef]? posts[postRef].color : color, borderColor: 'black'}}
        value={posts && posts[postRef]? formatValue(postRef) : week[d]}
        />)
      })
    )
  } 
    
    return screen < 500 ? (
      <tr  style={!show? {display: 'none'} : border? {borderBottom: '2px solid black'}: {}}>                      
        
              <Cell 
                // key={load.job + column.id}
                scope='row' 
                align="left"
                style={{ cursor: "default", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                />
              <Cell 
                // key={`${load.id} ${cols[day]?.label} ${i}`}
                id={ `${load.id} ${cols[day]?.label} ${i}` }
                postColor={posts[`${load.id} ${cols[day]?.label} ${i}`]?.color}
                dept={rota.dept}
                pos={load.pos}
                posLabel={load.label}
                shift={i}
                column={cols[day]} 
                align="center"
                style={{cursor: "pointer", backgroundColor: posts[`${load.id} ${cols[day]?.label} ${i}`]? '' : color, borderColor: 'black'}}
                value={ posts && posts[`${load.id} ${cols[day]?.label} ${i}`]? formatValue(`${load.id} ${cols[day]?.label} ${i}`) : week[day + 1]}
                />
              
      </tr>
    )
    :
    (
      <tr style={!show? {display: 'none'}: border? {borderBottom: '2px solid black'}: {}}>                      
        
              <Cell 
                // key={load.job + column.id} 
                scope='row'
                align="left"
                style={{ cursor: "default", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                />
              
                {buildCells()}
      </tr>
    )
}

export default Row;
