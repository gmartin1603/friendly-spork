import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import usePostsListener from '../helpers/postsListener';
import Row from './Row';
import TopRow from './TopRow';

function TableBody({rota, shift, rows, dayCount, cols, screen, weekNum}) {
    
  const [{profile,view}, dispatch] = useAuthState()


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

  

    
    return (
        <tbody
        className={`border-4`} 
        key={`${rota.dept} ${shift.label}` }
        >
            <TopRow
            shift={shift}
            cols={cols}
            screen={screen}
            dayCount={dayCount}
            />
            {
              rows.length > 0 &&
              rows.map((row, i) => {
                if (row[shift.id] && shift.color){
                  let border = false
                  if (rows[i+1]) {
                    console.log(row)
                    if (rows[i+1][shift.id] && row.group !== rows[i+1].group || !rows[i+1][shift.id]) {
                      border = true
                    }
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
                profile.level <= 1 &&
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