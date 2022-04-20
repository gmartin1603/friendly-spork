import React, { useEffect, useState } from 'react';
import { table } from '../context/style/style';

function TopRow({shift, posts, cols}) {
    const [cells, setCells] = useState({})

    useEffect(() => {
        setCells({})
        for (const post in posts) {
            if (post.charAt(post.length - 1) === shift.index.toString()) {
                if (posts[post].date >= cols[0].label && posts[post].date <= cols[6].label && posts[post]?.tag){
                    console.log(posts[post])
                    let cellRef = `${posts[post].tag.name}${posts[post].tag.reason}`
                    setCells((prev) => ({...prev, [cellRef]:posts[post].tag}))
                }

            } 
            
        }
    },[posts,cols])

    return (
        <tr>
              <td className={table.row.shift}>
                <h3 >
                  {`${shift.label} Shift`}
                </h3>
              </td>
              {
                cells &&
                Object.keys(cells).map((cell) => (
                    <td 
                    key={cells[cell].name+cells[cell].reason}
                    className={`${table.row.postTag} `}
                    style={{backgroundColor: cells[cell].color}}
                    >
                        <h3 >
                        {`${cells[cell].name} - ${cells[cell].reason}`}
                        </h3>
                    </td>

                ))  
              }
            </tr>
    );
}

export default TopRow;