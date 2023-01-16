import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Cell from './Cell'

function Row({rota, load, i, shiftObj, wk, screen, color, border}) {

  const [week, setWeek] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [hoverTog, setHvrTog] = useState(false)

  const [{profile, cols, posts, formObj}, dispatch] = useAuthState()

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
