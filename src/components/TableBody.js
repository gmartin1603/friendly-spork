import React, { useRef } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button } from '../context/style/style';
import useWindowSize from '../helpers/windowSize';
import Row from './Row';
import TopRow from './TopRow';

function TableBody({week, rota, cols, shift, rows, dayCount}) {

  const [{profile, posts}, dispatch] = useAuthState()

  const [width, height] = useWindowSize([0,0]);

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
          // color selection
          const prevRow = arr[arr.length - 1]
          let color = 0
          if (prevRow) {
            if (row.group !== prevRow.load.group) {
              color = 0
            } else {
              if (prevRow.color === shift.color[row.group][0]) {
                color = 1
              } else {
                color = 0
              }
            }
          }

          if (!activeMisc.current.includes(row.id)) {
            activeMisc.current.push(row.id)
          }

          arr.push({
            key:`${row.id}${shift.id}`,
            load: row,
            color: shift.color[row.group][color],
            screen: screen,
            day: dayCount,
            border: border,
            load: row,
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

      return arr
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
            {buildRows().map(row => (
              <Row
              key={row.key}
              show={row.show}
              load={row.load}
              i={shift.id}
              shiftObj={shift}
              week={week}
              activeMisc={activeMisc}
              color={row.color}
              rota={rota}
              fields={rota.fields[shift.id]}
              border={row.border}
              />
              ))}
            {
                width > 1200 &&
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