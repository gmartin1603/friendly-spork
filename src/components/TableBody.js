import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import { button, table } from '../context/style/style';
import usePostsListener from '../helpers/postsListener';
import Row from './Row';
import TopRow from './TopRow';

function TableBody({rota, shift, rows, dayCount, cols, screen, weekNum}) {
    
    const posts = usePostsListener(rota.dept)
    const {toggleForm} = useAuthState()

    const addRow = (e) => {
      
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
      toggleForm(obj)
    }

    
    return (
        <tbody
        className={`border-4`} 
        key={`${rota.dept} ${shift.label}` }
        >
            <TopRow
            posts={posts}
            shift={shift}
            cols={cols}
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
                    color={ i % 2 == 0? shift.color[row.group][0]:shift.color[row.group][1]}
                    screen={screen}
                    day={dayCount}
                    cols={cols}
                    border={border}
                    posts={posts}
                    />
                    ) 
                  }
                })
              } 
              {
                screen > 500 &&
                <tr>
                  <td className={` font-bold text-xl`}> 
                  <button 
                  className={`${button.green} w-.25 ml-10 text-xl`}
                  onClick={() => addRow()} 
                  >
                    +
                  </button> 
                  </td>  
                </tr>
              }
          </tbody>
    );
}

export default TableBody;