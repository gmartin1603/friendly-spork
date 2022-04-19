import React, { useEffect, useState } from 'react';
import { table } from '../context/style/style';
import usePostsListener from '../helpers/postsListener';
import Row from './Row';
import TopRow from './TopRow';

function TableBody({rota, shift, rows, dayCount, cols, screen, weekNum}) {
    
    const posts = usePostsListener(rota.dept)
    const [tags, setTags] = useState({})

    useEffect(() => {

    },[])
    return (
        <tbody key={`${rota.dept} ${shift.label}` }>
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
          </tbody>
    );
}

export default TableBody;