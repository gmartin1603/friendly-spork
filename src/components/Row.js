import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';
import Cell from './Cell'

function Row({ load, i, wk, cols, rota, screen, color, day, border}) {

  const [week, setWeek] = useState({})
  const [show, setShow] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [state, dispatch] = useAuthState()
  const posts = usePostsListener(state.view[0].dept)
  
  useEffect(() => {
    if (screen > 1200) {
      if (state.profile.level <= 1) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      setDisabled(true)
    }
  },[screen, state.profile])

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
        disabled={state.profile.level > 1? true:false}
        />
        )
      })
    )
  } 

  const styles = {
    main:`border-transparent hover:border-4	hover:border-blue`,
    last:`border-b-4`,
  }
    
    return show && (
    screen < 500 ? (
      <tr  className={border? `${styles.main} ${styles.last}`:styles.main}>
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
        post={posts && posts[`${load.id} ${cols[day]?.label} ${i}`]? posts[`${load.id} ${cols[day].label} ${i}`]:undefined}
        postColor={color}
        dept={rota.dept}
        pos={load}
        shift={i}
        column={cols[day]} 
        align="center"
        disabled={state.profile.level > 1? true:false}
        value={week[day + 1]}
        />      
      </tr>
    )
    :
    (
      <tr className={border? `${styles.main} ${styles.last}`:styles.main}>
        <Cell 
          first
          dept={rota.dept}
          pos={load}
          shift={i}
          column={cols}
          // key={load.job + column.id} 
          scope='row'
          align="left"
          // style={{ cursor: "pointer", backgroundColor: color}}
          postColor={color}
          value={load.label}
          disabled={disabled}
          />
        
          {buildCells()}
      </tr>
    ))
}

export default Row;
