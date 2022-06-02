import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth/AuthProvider';
import usePostsListener from '../helpers/postsListener';

function TopRow({shift, cols, screen, dayCount}) {

    const [{view, profile}, dispatch] = useAuthState()
    const posts = usePostsListener(`${view[0].dept}-posts`)
    const [cells, setCells] = useState({})

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

    const styles = {
        shift:`text-white text-2xl font-semibold px-.01 sticky left-0 bg-green`,
        postTag:`border-x text-center italic w-full`,
    }

    return (
        <tr className={`border-b-2`}>
              <td className={styles.shift}>
                <h3 >
                  {`${shift.label} Shift`}
                </h3>
              </td>
              {
                screen > 500 ?
                cols && cols.map((col) => (
                    <td className={``} key={col.label}>
                        {
                            Object.keys(cells).map(i => {
                                let tag = cells[i]
                                if (tag.date === col.label) {
                                    return (
                                    <div 
                                        key={tag.data.name+tag.data.reason}
                                        style={{backgroundColor: tag.data.color,}}
                                        className={`${styles.postTag} `}
                                    >
                                        <p
                                        >
                                        {`${tag.data.name} - ${tag.data.reason}`}
                                        </p>
                                    </div>
                                    )
                                }
                            })
                        }
                    </td>
                )) 
                :
                <td className={``}>
                    {
                        Object.keys(cells).map(i => {
                            let tag = cells[i]
                            if (tag.date === cols[dayCount].label) {
                                return (
                                <div 
                                    key={tag.data.name+tag.data.reason}
                                    style={{backgroundColor: tag.data.color,}}
                                    className={`${styles.postTag} `}
                                >
                                    <p
                                    >
                                    {`${tag.data.name} - ${tag.data.reason}`}
                                    </p>
                                </div>
                                )
                            }
                        })
                    }
                </td>
              }
              
            </tr>
    );
}

export default TopRow;