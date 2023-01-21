import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import Cell from './Cell'

function Row({rota, load, i, shiftObj, wk, screen, color, border}) {

  const [week, setWeek] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
  })
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
    let obj = new Object(week)

    if (load.group !== "misc") {
      for (const prop in obj) {
        if (load?.data?.[prop][shiftObj.id]) {
          obj[prop] = rota.fields[shiftObj.id][load.group][load.data?.[prop][shiftObj.id][wk]]
        }
      }
      setWeek(obj)
    }

  },[wk, posts, cols])



  const buildCells = () => {
    let arr = []
    Object.keys(week).map(d => {
      const postRef = `${load.id} ${cols[d-1]?.label} ${i}`
      arr.push({
        id: postRef,
        post: posts && posts[postRef]? posts[postRef]:undefined,
        column: cols[d-1],
        value: week[d],
        disabled: profile.level > 1? true:false,
      })
    })
    return arr
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
        {buildCells().map(cell => (
          <Cell
          id={cell.id}
          key={cell.id}
          hoverTog={hoverTog}
          postColor={color}
          dept={rota.dept}
          pos={load}
          post={cell.post}
          shift={i}
          shiftObj={shiftObj}
          column={cell.column}
          align="center"
          value={cell.value}
          disabled={cell.disabled}
          />
        ))}
    </tr>
    )
}

export default Row;
