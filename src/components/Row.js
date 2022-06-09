import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Cell from './Cell'

function Row({ load, i, wk, rota, screen, cols, color, day, border}) {

  const [week, setWeek] = useState({})
  const [show, setShow] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [hoverTog, setHvrTog] = useState(false)
  
  const [{profile, posts, formObj}, dispatch] = useAuthState()
  
  useEffect(() => {
    if (formObj.type) {
      setHvrTog(false)
    }
  },[formObj])

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
    // console.log(posts)
    let monRef = ''
    let tueRef = ''
    let wedRef = ''
    let thuRef = ''
    let friRef = ''
    let satRef = ''
    let sunRef = ''
    if (posts && cols.length > 0) {
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
        hoverTog={hoverTog}
        postColor={color}
        dept={rota.dept}
        pos={load}
        post={posts && posts[postRef]? posts[postRef]:undefined}
        shift={i}
        column={cols[d-1]} 
        align="center"
        // style={{  cursor: "pointer", padding: '0', backgroundColor: posts && posts[postRef]? posts[postRef].color : color, borderColor: 'black'}}
        value={week[d]}
        disabled={profile.level > 1? true:false}
        />
        )
      })
    )
  } 

  const styles = {
    main:`transition-transform bg-clearBlack ${border? "border-b-4":""}`,
    hover:`hover:scale-105 hover:-translate-y-2`,
    click:`scale-105 -translate-y-1`,
    default:``,
  }
    
    return show && (
    screen < 500 ? (
      <tr  className={`${styles.main} ${hoverTog? styles.click:styles.default}`}
      onClick={() => setHvrTog(!hoverTog)}
      >
        <Cell 
        first
        scope='row' 
        align="left"
        postColor={color}
        hoverTog={hoverTog}
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
        hoverTog={hoverTog}
        pos={load}
        shift={i}
        column={cols[day]} 
        align="center"
        disabled={profile.level > 1? true:false}
        value={week[day + 1]}
        />      
      </tr>
    )
    :
    (
      <tr  className={`${styles.main} ${hoverTog? styles.click:styles.default} hover:border-2 hover:border-blue`}
      onClick={() => setHvrTog(!hoverTog)}
      >
        <Cell 
          first
          hoverTog={hoverTog}
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
