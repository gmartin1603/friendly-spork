import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Cell from './Cell'

function Row({ load, i, shiftObj, wk, screen, color, day, border, activeMisc, show}) {

  const [week, setWeek] = useState({})
  // const [show, setShow] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [hoverTog, setHvrTog] = useState(false)

  const [{profile, posts, formObj, cols, rota}, dispatch] = useAuthState()

  useEffect(() => {
    if (formObj.type) {
      setHvrTog(false)
    }
  },[formObj])

  // useEffect(() => {
  //   // console.log(activeMisc.current)
  //   if (show) {
  //     if (!activeMisc.current.includes(load.id)) {
  //       activeMisc.current.push(load.id)
  //     }
  //   } else {
  //     if (activeMisc.current.includes(load.id)) {
  //       let arr = []
  //       activeMisc.current.map(str => {
  //         if (str !== load.id) {
  //           arr.push(str)
  //         }
  //       })
  //       activeMisc.current = arr
  //     }
  //   }
  // },[cols])

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
    // let monRef = ''
    // let tueRef = ''
    // let wedRef = ''
    // let thuRef = ''
    // let friRef = ''
    // let satRef = ''
    // let sunRef = ''
    // if (posts && cols.length > 0) {
    //   monRef = posts.hasOwnProperty(`${load.id} ${cols[0]?.label} ${i}`)
    //   tueRef = posts.hasOwnProperty(`${load.id} ${cols[1]?.label} ${i}`)
    //   wedRef = posts.hasOwnProperty(`${load.id} ${cols[2]?.label} ${i}`)
    //   thuRef = posts.hasOwnProperty(`${load.id} ${cols[3]?.label} ${i}`)
    //   friRef = posts.hasOwnProperty(`${load.id} ${cols[4]?.label} ${i}`)
    //   satRef = posts.hasOwnProperty(`${load.id} ${cols[5]?.label} ${i}`)
    //   sunRef = posts.hasOwnProperty(`${load.id} ${cols[6]?.label} ${i}`)

    // }
    // console.log({mon: monRef, sun: sunRef})

    // Normal Rotation Init
    let obj = {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
    }
    for (const prop in obj) {
      if (load?.data?.[prop][shiftObj.id]) {
        obj[prop] = rota.fields[shiftObj.id][load.group][load.data?.[prop][shiftObj.id][wk]]
      }
    }
    setWeek(obj)

    // Misc Job Row show logic
    // if (!load.data) {
    //   if (monRef || tueRef || wedRef || thuRef || friRef || satRef || sunRef) {
    //     // setShow(true)
    //   } else {
    //     // console.log({pos:load.id, shift:i, hide: true})
    //     // setShow(false)
    //   }
    // } else {
    //   // setShow(true)
    // }

  },[wk, posts, cols, rota])



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
        shiftObj={shiftObj}
        column={cols[d-1]}
        align="center"
        value={week[d]}
        disabled={profile.level > 1? true:false}
        />
        )
      })
    )
  }

  const styles = {
    main:`transition-transform bg-clearBlack ${border? "border-b-4":""}`,
    hover:`hover:scale-105 hover:-translate-y-[1%] hover:-translate-x-0`,
    click:`scale-105 -translate-y-1`,
    default:``,
  }

    return (
      <tr  className={`${styles.main} ${hoverTog? styles.click:styles.default}`}
      onClick={() => setHvrTog(!hoverTog)}
      >
        <Cell
        first
        hoverTog={hoverTog}
        dept={rota.dept}
        pos={load}
        shift={i}
        shiftObj={shiftObj}
        column={cols}
        scope='row'
        align="left"
        postColor={color}
        value={load.label}
        disabled={disabled}
        />
        {buildCells()}
    </tr>
    )
}

export default Row;
