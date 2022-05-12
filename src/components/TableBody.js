import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import usePostsListener from '../helpers/postsListener';
import Row from './Row';
import TopRow from './TopRow';

function TableBody({rota, shift, rows, dayCount, cols, screen, weekNum}) {
    
  const [state, dispatch] = useAuthState()

  const posts = usePostsListener(state.view[0].dept)
  const [cells, setCells] = useState({})

  const addRow = (e) => {
    e.preventDefault()
    let options = []

    rows.forEach(row => {
      if (row.group === "misc") {
        options.push(row)
      }
    })

    let obj = {
      type: "week",
      dept: rota.dept,
      options: options,
      shift: shift.index,
      cols: cols,
    }

    dispatch({
      type: "SET-OBJ",
      load: obj,
      name: "formObj"
    })

    return dispatch({type:"OPEN-FORM", name:"showWeek"})
  }

  useEffect(() => {
    setCells({})
    for (const post in posts) {
        if (post.charAt(post.length - 1) === shift.index.toString()) {
            if (posts[post].date >= cols[0].label && posts[post].date <= cols[6].label && posts[post]?.tag){
                // console.log(posts[post])
                let cellRef = `${posts[post].tag.name}${posts[post].tag.reason}`
                let cell = {date:posts[post].date, data: posts[post].tag}
                setCells((prev) => ({...prev, [cellRef]:cell}))
            }

        } 
        
    }
},[posts,cols])

    
    return (
        <tbody
        className={`border-4`} 
        key={`${rota.dept} ${shift.label}` }
        >
            <TopRow
            shift={shift}
            cols={cols}
            screen={screen}
            cells={cells}
            dayCount={dayCount}
            />
            {
              rows.length > 0 &&
              rows.map((row, i) => {
                if (row[shift.id] && shift.color){
                  let border = false
                  if (row[shift.id] && row.group !== rows[i+1]?.group) {
                    border = true
                  }
                  return (
                    <Row
                    key={row.id+shift.label}
                    load={row}
                    i={shift.index}
                    wk={weekNum}
                    rota={rota}
                    // color={ i % 2 == 0? "rgb(250, 249, 246)":"rgb(250, 249, 246, 0.8)"}
                    color={ i % 2 == 0? shift.color[row.group][0]:shift.color[row.group][1]}
                    screen={screen}
                    day={dayCount}
                    cols={cols}
                    border={border}
                    />
                    ) 
                  }
                })
              } 
              {
                screen > 1200 &&
                state.profile.level <= 1 &&
                <tr>
                  <td className={`flex justify-center `}> 
                  <button 
                  className={`${button.green} w-[60%] border-2 text-xl hover:border-white`}
                  onClick={(e) => addRow(e)} 
                  >
                    New Row
                  </button> 
                  </td>  
                </tr>
              }
          </tbody>
    );
}

export default TableBody;