import React, { useRef } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import Row from './Row';
import TopRow from './TopRow';

function TableBody({rota, shift, cols, rows, dayCount, screen}) {
    
  const [{profile, week}, dispatch] = useAuthState()

  const activeMisc = useRef([])

  const addRow = (e) => {
    e.preventDefault()
    let options = []

    rows.forEach(row => {
      if (row.group === "misc") {
        if (!activeMisc.current.includes(row.id)) {
          options.push(row)
        }
      }
    })

    let obj = {
      type: "week",
      dept: rota.dept,
      options: options,
      shift: shift,
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
        key={`${rota.dept} ${shift.label}` }
        >
            <TopRow
            shift={shift}
            screen={screen}
            dayCount={dayCount}
            cols={cols}
            />
            {
              rows.length > 0 &&
              rows.map((row, i) => {
                if (row[shift.id] && shift.color){
                  const nxtRow = rows[i+1]
                  let border = false
                  if (nxtRow) {
                    // console.log(row)
                    if (row.group !== nxtRow.group) {
                    if (nxtRow[shift.id]) {
                        border = true
                      }
                    } else {
                      // border = true
                    } 
                  } else {
                    border = true
                  }
                  return (
                    <Row
                    key={`${row.id}${shift.index}`}
                    load={row}
                    i={shift.index}
                    shiftObj={shift}
                    wk={week}
                    rota={rota}
                    activeMisc={activeMisc}
                    color={ i % 2 == 0? shift.color[row.group][0]:shift.color[row.group][1]}
                    screen={screen}
                    day={dayCount}
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
                  className={`${button.green} w-[60%] px-10 my-[5px] border-2 text-xl hover:border-white`}
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