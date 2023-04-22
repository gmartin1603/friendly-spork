import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import useWindowSize from '../helpers/windowSize';
import Cell from './Cell'

function Row({ load, shiftId, shiftObj, color, border}) {
  const initialState = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
  }
  const [state, setState] = useState(initialState)
  const [disabled, setDisabled] = useState(true)
  const [hoverTog, setHvrTog] = useState(false)
  const [width, height] = useWindowSize([0,0])

  const [{profile, cols, rota, posts, week, formObj}, dispatch] = useAuthState()

  // useEffect(() => {
  //   console.log("Row Rendered")
  // }, [week]);

  useEffect(() => {
    if (formObj.type) {
      setHvrTog(false)
    }
  },[formObj])

  useEffect(() => {
    if (width > 1200) {
      if (profile.level <= 1) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    } else {
      setDisabled(true)
    }
  },[width, profile])

  useEffect(() => {
    // console.log(state)

    // Normal Rotation Init
    let obj = new Object(initialState)

    if (load.group !== "misc") {
      for (const prop in obj) {
        if (load?.data[prop][shiftObj.id]) {
          obj[prop] = rota.fields[shiftObj.id][load.group][load.data[prop][shiftObj.id][week]]
        }
      }
      setState(obj)
    }
  },[week, rota])

  const openForm = () => {
    let obj = {
      type: "week",
      dept: rota.dept,
      pos: load,
      shift: shiftObj,
      cols: cols,
    }

    dispatch({
      type: "SET-OBJ",
      load: obj,
      name: "formObj"
    })

    return dispatch({type:"OPEN-FORM", name:"showWeek"})
  }

  const handleClick = () => {
    if (!hoverTog) {
      if (disabled) {
        setHvrTog(true)
      } else {
        if (load.group !== "misc") {
          openForm()
        }
      }
    }
  }

  const closeRow = () => {
    dispatch({type: "SET-ARR", load: [], name: "scale"})
    setHvrTog(false)
  }

  const styles = {
    main:`transition-transform bg-clearBlack ${border? "border-b-2":""}`,
    click:`scale-105 -translate-y-1`,
    default:``,
    posLable:`sticky left-0 bg-green border-r-2 border-gray-500 text-right`,
    cancel:{backgroundColor:"red", color:"white", borderColor: "black", borderRadius:"10px", fontWeight:800, paddingRight:"2%", fontSize:"2rem", transform:"scaley(1.8)", cursor:"pointer"},
  }

    return (
      <tr  className={`${styles.main} ${hoverTog? styles.click:styles.default}`}
      onClick={() => hoverTog ? closeRow() : setHvrTog(true)}
      >
        <td className={styles.posLable}
        onClick={() => handleClick()}
        style={hoverTog? styles.cancel : disabled? {} : {cursor:"pointer"}}
        >
          {hoverTog? "X" : load.label}
        </td>
        {Object.keys(state).map(d => {
          const postRef = `${load.id} ${cols[d-1]?.label} ${shiftId}`
          return (
            <Cell
            id={postRef}
            key={postRef}
            hoverTog={hoverTog}
            postColor={color}
            dept={rota.dept}
            pos={load}
            post={posts && posts[postRef]? posts[postRef]:undefined}
            shift={shiftId}
            shiftObj={shiftObj}
            column={cols[d-1]}
            align="center"
            value={state[d]}
            disabled={profile.level > 1? true:false}
            />
          )
          })
        }
    </tr>
    )
}

export default Row;
