import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import Row from './Row';
import TopRow from './TopRow';

function TableBody({rota, shift, rows, dayCount, screen}) {

  const [{profile, week, posts, cols}, dispatch] = useAuthState()

  const [display, setDisplay] = useState([]);
  const activeMisc = useRef([])

  useEffect(() => {
 console.log("reload")
 buildRows()
  }, [cols, posts]);

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

  const buildRows = () => {
    const mon = cols[0].label
    const sun = cols[6].label
    let arr = []
    let misc = []
    rows.length > 0 &&
    rows.map((row, i) => {
      if (row[shift.id]){
        let show = true
        if (!row.data) {
          show = false
          for (const key in posts) {
            const post = posts[key]
            // console.log(post)
            if (post.shift === shift.id) {
            if (post.pos === row.id) {
                if (post.date >= mon) {
                  if (post.date <= sun) {
                    show = true
                  }
                }
              }
            }
          }
        }

        // group border check
        const nxtRow = rows[i+1]
        let border = false
        if (nxtRow) {
          // console.log(row)
          if (row.group !== nxtRow.group) {
            if (nxtRow[shift.id]) {
              border = true
            } else {
              border = false
            }
          }
        } else {
          border = true
        }
        if (show) {
          if (!activeMisc.current.includes(row.id)) {
            misc.push(row.id)
          }
          arr.push({
            show: show,
            key:`${row.id}${shift.id}`,
            load: row,
            i: shift.id,
            shiftObj: shift,
            color: i % 2 == 0? shift.color[row.group][0]:shift.color[row.group][1],
            screen: screen,
            day: dayCount,
            border: border,
            })
        } else {
          if (activeMisc.current.includes(row.id)) {
            activeMisc.current.map(id => {
              if (id !== row.id) {
                misc.push(id)
              }
            })
            activeMisc.current = misc
          }
        }
      }
    })
      return setDisplay(arr)
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
            {display.map(row => (
              <Row
              key={row.key}
              show={row.show}
              load={row.load}
              i={row.i}
              shiftObj={row.shiftObj}
              wk={week}
              activeMisc={activeMisc}
              color={row.color}
              // screen={screen}
              day={dayCount}
              border={row.border}
              />
              ))}
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