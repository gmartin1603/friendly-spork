import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import Cell from './Cell'

function Row({posts, load, i, wk, cols, rota, screen, color, day, border}) {

  const [week, setWeek] = useState({})
  const [show, setShow] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const {profile} = useAuthState()
  
  useEffect(() => {
    if (screen > 1200) {
      if (profile.level <= 1) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      setDisabled(true)
    }
  },[screen, profile])

  useEffect(() => {
    let monRef = ''
    let tueRef = ''
    let wedRef = ''
    let thuRef = ''
    let friRef = ''
    let satRef = ''
    let sunRef = ''
    if (posts) {
      monRef = posts.hasOwnProperty(`${load.id} ${cols[1]?.label} ${i}`)
      tueRef = posts.hasOwnProperty(`${load.id} ${cols[2]?.label} ${i}`)
      wedRef = posts.hasOwnProperty(`${load.id} ${cols[3]?.label} ${i}`)
      thuRef = posts.hasOwnProperty(`${load.id} ${cols[4]?.label} ${i}`)
      friRef = posts.hasOwnProperty(`${load.id} ${cols[5]?.label} ${i}`)
      satRef = posts.hasOwnProperty(`${load.id} ${cols[6]?.label} ${i}`)
      sunRef = posts.hasOwnProperty(`${load.id} ${cols[7]?.label} ${i}`)

    }
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

  

  const buildCells = () => {  
    return (
      week &&
      Object.keys(week).map(d => {
        const postRef = `${load.id} ${cols[d-1]?.label} ${i}`
        return (
        <Cell 
        id={ postRef }
        key={postRef}
        postColor={color}
        dept={rota.dept}
        pos={load}
        post={posts && posts[postRef]? posts[postRef]:undefined}
        shift={i}
        column={cols[d-1]} 
        align="center"
        // style={{  cursor: "pointer", padding: '0', backgroundColor: posts && posts[postRef]? posts[postRef].color : color, borderColor: 'black'}}
        value={week[d]}
        disabled={disabled}
        />
        )
      })
    )
  } 
    
    return screen < 500 ? (
      <tr  style={!show? {display: 'none'} : border? {borderBottom: '2px solid black'}: {}}>                      
        
              <Cell 
                first
                scope='row' 
                align="left"
                postColor={color}
                // style={{ cursor: "pointer", backgroundColor: color, borderColor: 'black'}}
                value={load.label}
                disabled
                />
              <Cell 
                // key={`${load.id} ${cols[day]?.label} ${i}`}
                id={ `${load.id} ${cols[day]?.label} ${i}` }
                postColor={color}
                dept={rota.dept}
                pos={load}
                shift={i}
                column={cols[day]} 
                align="center"
                disabled={disabled}
                // style={{cursor: "pointer", backgroundColor: posts[`${load.id} ${cols[day]?.label} ${i}`]? '' : color, borderColor: 'black'}}
                value={week[day + 1]}
                />
              
      </tr>
    )
    :
    (
      <tr style={!show? {display: 'none'}: border? {borderBottom: '2px solid black'}: {}}>                      
        
              <Cell 
                first
                dept={rota.dept}
                pos={load}
                shift={i}
                column={cols}
                // key={load.job + column.id} 
                scope='row'
                align="left"
                style={{ cursor: "pointer", backgroundColor: color, borderColor: 'black'}}
                postColor={color}
                value={load.label}
                disabled={disabled}
                />
              
                {buildCells()}
      </tr>
    )
}

export default Row;
